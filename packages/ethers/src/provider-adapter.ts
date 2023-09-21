import {
  BaseSmartContractAccount,
  SmartAccountProvider,
  getChain,
  type AccountMiddlewareFn,
  type Address,
  type FeeDataMiddleware,
  type GasEstimatorMiddleware,
  type HttpTransport,
  type PaymasterAndDataMiddleware,
  type PublicErc4337Client,
} from "@alchemy/aa-core";
import { defineReadOnly } from "@ethersproject/properties";
import { JsonRpcProvider } from "@ethersproject/providers";
import { AccountSigner } from "./account-signer.js";

export type EthersProviderAdapterOpts<
  TAccount extends
    | BaseSmartContractAccount<HttpTransport>
    | undefined = undefined
> =
  | {
      rpcProvider: string | PublicErc4337Client<HttpTransport>;
      entryPointAddress: Address;
      chainId: number;
    }
  | {
      accountProvider: SmartAccountProvider<TAccount, HttpTransport>;
    };

/** Lightweight Adapter for SmartAccountProvider to enable Signer Creation */
export class EthersProviderAdapter<
  TAccount extends
    | BaseSmartContractAccount<HttpTransport>
    | undefined = undefined
> extends JsonRpcProvider {
  readonly accountProvider: SmartAccountProvider<TAccount, HttpTransport>;
  constructor(opts: EthersProviderAdapterOpts<TAccount>) {
    super();
    if ("accountProvider" in opts) {
      this.accountProvider = opts.accountProvider;
    } else {
      const chain = getChain(opts.chainId);
      this.accountProvider = new SmartAccountProvider(
        opts.rpcProvider,
        opts.entryPointAddress,
        chain
      );
    }
  }

  /**
   * Rewrites the send method to use the account provider's EIP-1193
   * compliant request method
   *
   * @param method - the RPC method to call
   * @param params - the params required by the RPC method
   * @returns the result of the RPC call
   */
  send(method: string, params: any[]): Promise<any> {
    return this.accountProvider.request({ method, params });
  }

  /**
   * Connects the Provider to an Account and returns a Signer
   *
   * @param fn - a function that takes the account provider's rpcClient and returns a BaseSmartContractAccount
   * @returns an {@link AccountSigner} that can be used to sign and send user operations
   */
  connectToAccount<TAccount extends BaseSmartContractAccount<HttpTransport>>(
    fn: (rpcClient: PublicErc4337Client) => TAccount
  ): AccountSigner<TAccount> {
    defineReadOnly(
      this as unknown as EthersProviderAdapter<TAccount>,
      "accountProvider",
      this.accountProvider.connect(fn)
    );
    return this.getAccountSigner<TAccount>();
  }

  /**
   * @returns an {@link AccountSigner} using this as the underlying provider
   */
  getAccountSigner<
    TAccount extends BaseSmartContractAccount<HttpTransport>
  >(): AccountSigner<TAccount> {
    if (!this.accountProvider.isConnected()) {
      throw new Error("Account not connected");
    }

    return new AccountSigner(
      this as unknown as EthersProviderAdapter<TAccount>
    );
  }

  withPaymasterMiddleware = (overrides: {
    dummyPaymasterDataMiddleware?: PaymasterAndDataMiddleware;
    paymasterDataMiddleware?: PaymasterAndDataMiddleware;
  }): this => {
    this.accountProvider.withPaymasterMiddleware(overrides);
    return this;
  };

  withGasEstimator = (override: GasEstimatorMiddleware): this => {
    this.accountProvider.withGasEstimator(override);
    return this;
  };

  withFeeDataGetter = (override: FeeDataMiddleware): this => {
    this.accountProvider.withFeeDataGetter(override);
    return this;
  };

  withCustomMiddleware = (override: AccountMiddlewareFn): this => {
    this.accountProvider.withCustomMiddleware(override);
    return this;
  };

  getPublicErc4337Client(): PublicErc4337Client {
    return this.accountProvider.rpcClient;
  }

  /**
   * @param provider - the ethers JSON RPC provider to convert
   * @param entryPointAddress - the entrypoint address that will be used for UserOperations
   * @returns an instance of {@link EthersProviderAdapter}
   */
  static fromEthersProvider(
    provider: JsonRpcProvider,
    entryPointAddress: Address
  ): EthersProviderAdapter {
    return new EthersProviderAdapter({
      rpcProvider: provider.connection.url,
      entryPointAddress,
      chainId: provider.network.chainId,
    });
  }
}
