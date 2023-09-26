---
outline: deep
head:
  - - meta
    - property: og:title
      content: Sponsoring Gas
  - - meta
    - name: description
      content: Guide to Sponsor Gas of an account
  - - meta
    - property: og:description
      content: Guide to Sponsor Gas of an account
---

# Sponsoring Gas

Gas fees have long been a concern for dApp users. With Alchemy's [Gas Manager](https://dashboard.alchemy.com/gas-manager), you can sponsor gas for certain accounts, providing a seamless user experience. In this guide, we'll show you how to use the Gas Manager to send sponsored user operations from a smart account.

## Step-by-Step Guide to Sponsoring Gas

Assuming you already have a project set up with the required packages installed, follow these steps to sponsor gas for your users:

### 1. Creating the Provider

The first step is to create the provider which can be used to send user operations and interact with the blockchain. The code snippet below shows how to create a provider using `AlchemyProvider`:

<<< @/snippets/provider.ts

You'll need to replace `ALCHEMY_API_KEY` with your unique Alchemy API key. You can get your API key from the [Alchemy dashboard](https://dashboard.alchemy.com/).

### 2. Creating and Using the Gas Manager Policy

Gas manager policies are rules defined by you that determine when you will sponsor a user operation. You can create a gas policy by going to the [Gas Manager](https://dashboard.alchemy.com/gas-manager) and clicking on the ["Create Policy" button](https://dashboard.alchemy.com/gas-manager/policy/create). Once you've created a policy, you'll be able to see its policy id in the Gas Manager dashboard. You'll need this policy id to link your provider to the Gas Manager.

Replace `GAS_MANAGER_POLICY_ID` with your policy id in the code snippet below. To learn more about gas policies and how to create them, check out the guide on [creating gas policies](https://docs.alchemy.com/docs/setup-a-gas-manager-policy).

```ts
import { AlchemyProvider } from "@alchemy/aa-alchemy";
import { LightSmartContractAccount } from "@alchemy/aa-accounts";
import { LocalAccountSigner, type SmartAccountSigner } from "@alchemy/aa-core";
import { sepolia } from "viem/chains";

const chain = sepolia;
const PRIVATE_KEY = "0xYourEOAPrivateKey";
const eoaSigner: SmartAccountSigner =
  LocalAccountSigner.privateKeyToAccountSigner(PRIVATE_KEY);
const entryPointAddress = "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789";

const provider = new AlchemyProvider({
  apiKey: "ALCHEMY_API_KEY", // replace with your alchemy api key of the Alchemy app associated with the Gas Manager, get yours at https://dashboard.alchemy.com/
  chain,
  entryPointAddress: entryPointAddress,
}).connect(
  (rpcClient) =>
    new LightSmartContractAccount({
      entryPointAddress: entryPointAddress,
      chain: rpcClient.chain,
      owner: eoaSigner,
      factoryAddress: "0xDC31c846DA74400C732edb0fE888A2e4ADfBb8b1",
      rpcClient,
    })
);

const GAS_MANAGER_POLICY_ID = "YourGasManagerPolicyId"; // Gas Manager policy id, get yours at https://dashboard.alchemy.com/gas-manager/policy/create // [!code focus:7]

// linking provider to Gas Manager so that the user operations sent using this provider are sponsored by the Gas Manager
provider.withAlchemyGasManager({
  policyId: GAS_MANAGER_POLICY_ID,
  entryPoint: entryPointAddress,
});

// sends a sponsored user operation from your smart account
const { hash } = await provider.sendUserOperation({
  target: "0xTargetAddress",
  data: "0xCallData",
  value: 0n, // value: bigint or undefined
});
```

Here we are creating a gas manager policy and linking it to the provider. This ensures that user operations sent using this provider are sponsored.

### 3. Sending the Sponsored UserOperation

It's finally time to send the user operation! We can simply call `sendUserOperation` on the provider to send a user operation as we would normally do. The only difference is that the user operation will be sponsored by the Gas Manager because we've already linked the provider to the Gas Manager Policy:

```ts
import { AlchemyProvider } from "@alchemy/aa-alchemy";
import { LightSmartContractAccount } from "@alchemy/aa-accounts";
import { LocalAccountSigner, type SmartAccountSigner } from "@alchemy/aa-core";
import { sepolia } from "viem/chains";

const chain = sepolia;
const PRIVATE_KEY = "0xYourEOAPrivateKey";
const eoaSigner: SmartAccountSigner =
  LocalAccountSigner.privateKeyToAccountSigner(PRIVATE_KEY);
const entryPointAddress = "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789";

const provider = new AlchemyProvider({
  apiKey: "ALCHEMY_API_KEY", // replace with your alchemy api key of the Alchemy app associated with the Gas Manager, get yours at https://dashboard.alchemy.com/
  chain,
  entryPointAddress: entryPointAddress,
}).connect(
  (rpcClient) =>
    new LightSmartContractAccount({
      entryPointAddress: entryPointAddress,
      chain: rpcClient.chain,
      owner: eoaSigner,
      factoryAddress: "0xDC31c846DA74400C732edb0fE888A2e4ADfBb8b1",
      rpcClient,
    })
);

const GAS_MANAGER_POLICY_ID = "YourGasManagerPolicyId"; // Gas Manager policy id, get yours at https://dashboard.alchemy.com/gas-manager/policy/create

// linking provider to Gas Manager so that the user operations sent using this provider are sponsored by the Gas Manager
provider.withAlchemyGasManager({
  policyId: GAS_MANAGER_POLICY_ID,
  entryPoint: entryPointAddress,
});

// sends a sponsored user operation from your smart account // [!code focus:6]
const { hash } = await provider.sendUserOperation({
  target: "0xTargetAddress",
  data: "0xCallData",
  value: 0n, // value: bigint or undefined
});
```

And that's it! You've successfully set up a gas sponsorship policy using Alchemy's Gas Manager that is being used to sponsor user operations.
