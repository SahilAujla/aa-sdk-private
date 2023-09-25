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

### 1. Importing the Required Dependencies

```ts
import { AlchemyProvider } from "@alchemy/aa-alchemy"; // [!code focus:5]
import { LightSmartContractAccount } from "@alchemy/aa-accounts";
import { LocalAccountSigner, type SmartAccountSigner } from "@alchemy/aa-core";
import { sepolia } from "viem/chains";
import { withAlchemyGasManager } from "@alchemy/aa-alchemy"; // Importing `withAlchemyGasManager` from `aa-alchemy` that will be used to link Gas Manager to the Light Account for gas sponsorship

const chain = sepolia;
const PRIVATE_KEY = "0xYourEOAPrivateKey";
const eoaSigner: SmartAccountSigner =
  LocalAccountSigner.privateKeyToAccountSigner(`0x${PRIVATE_KEY}`);
const entryPointAddress = "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789";

const GAS_MANAGER_POLICY_ID = "YourGasManagerPolicyId"; // Gas Manager policy id, get yours at https://dashboard.alchemy.com/gas-manager/policy/create

let provider = new AlchemyProvider({
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

// linking provider to Gas Manager so that the user operations sent using this provider are sponsored by the Gas Manager
provider = withAlchemyGasManager(provider, {
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

### 2. Configuring Your Chain and Signer

Define the chain you want to sponsor user operations on, the Entrypoint contract address and the signer type you want to use. In this case we're using an EOA signer:

```ts
import { AlchemyProvider } from "@alchemy/aa-alchemy";
import { LightSmartContractAccount } from "@alchemy/aa-accounts";
import { LocalAccountSigner, type SmartAccountSigner } from "@alchemy/aa-core";
import { sepolia } from "viem/chains";
import { withAlchemyGasManager } from "@alchemy/aa-alchemy"; // Importing `withAlchemyGasManager` from `aa-alchemy` that will be used to link Gas Manager to the Light Account for gas sponsorship

const chain = sepolia; // [!code focus:4]
const PRIVATE_KEY = "0xYourEOAPrivateKey";
const eoaSigner: SmartAccountSigner =
  LocalAccountSigner.privateKeyToAccountSigner(`0x${PRIVATE_KEY}`);
const entryPointAddress = "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789";

const GAS_MANAGER_POLICY_ID = "YourGasManagerPolicyId"; // Gas Manager policy id, get yours at https://dashboard.alchemy.com/gas-manager/policy/create

let provider = new AlchemyProvider({
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

// linking provider to Gas Manager so that the user operations sent using this provider are sponsored by the Gas Manager
provider = withAlchemyGasManager(provider, {
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

### 3. Setting Up Your Gas Policy

Gas policies are rules defined by you that determine when you will sponsor a user operation. You can create a gas policy by going to the [Gas Manager](https://dashboard.alchemy.com/gas-manager) and clicking on the ["Create Policy" button](https://dashboard.alchemy.com/gas-manager/policy/create). Once you've created a policy, you'll be able to see its policy id in the Gas Manager dashboard. You'll need this policy id to link your provider to the Gas Manager.

Replace `GAS_MANAGER_POLICY_ID` with your policy id in the code snippet below. To learn more about gas policies and how to create them, check out the guide on [creating gas policies](https://docs.alchemy.com/docs/setup-a-gas-manager-policy).

```ts
import { AlchemyProvider } from "@alchemy/aa-alchemy";
import { LightSmartContractAccount } from "@alchemy/aa-accounts";
import { LocalAccountSigner, type SmartAccountSigner } from "@alchemy/aa-core";
import { sepolia } from "viem/chains";
import { withAlchemyGasManager } from "@alchemy/aa-alchemy"; // Importing `withAlchemyGasManager` from `aa-alchemy` that will be used to link Gas Manager to the Light Account for gas sponsorship

const chain = sepolia;
const PRIVATE_KEY = "0xYourEOAPrivateKey";
const eoaSigner: SmartAccountSigner =
  LocalAccountSigner.privateKeyToAccountSigner(`0x${PRIVATE_KEY}`);
const entryPointAddress = "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789";

const GAS_MANAGER_POLICY_ID = "YourGasManagerPolicyId"; // Gas Manager policy id, get yours at https://dashboard.alchemy.com/gas-manager/policy/create // [!code focus]

let provider = new AlchemyProvider({
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

// linking provider to Gas Manager so that the user operations sent using this provider are sponsored by the Gas Manager
provider = withAlchemyGasManager(provider, {
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

### 4. Initializing the Provider

Create your provider instance that will be used to send user operations and interact with the blockchain. You'll need to replace `ALCHEMY_API_KEY` with your unique Alchemy API key. You can get your API key from the [Alchemy dashboard](https://dashboard.alchemy.com/).

::: tip Note
You will need to use the Alchemy API key of the Alchemy app associated with the Gas Policy being used. You can check which app is associated with the Gas Policy by going to the [Gas Manager dashboard](https://dashboard.alchemy.com/gas-manager).
:::

```ts
import { AlchemyProvider } from "@alchemy/aa-alchemy";
import { LightSmartContractAccount } from "@alchemy/aa-accounts";
import { LocalAccountSigner, type SmartAccountSigner } from "@alchemy/aa-core";
import { sepolia } from "viem/chains";
import { withAlchemyGasManager } from "@alchemy/aa-alchemy"; // Importing `withAlchemyGasManager` from `aa-alchemy` that will be used to link Gas Manager to the Light Account for gas sponsorship

const chain = sepolia;
const PRIVATE_KEY = "0xYourEOAPrivateKey";
const eoaSigner: SmartAccountSigner =
  LocalAccountSigner.privateKeyToAccountSigner(`0x${PRIVATE_KEY}`);
const entryPointAddress = "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789";

const GAS_MANAGER_POLICY_ID = "YourGasManagerPolicyId"; // Gas Manager policy id, get yours at https://dashboard.alchemy.com/gas-manager/policy/create //

let provider = new AlchemyProvider({
  // [!code focus:14]
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

// linking provider to Gas Manager so that the user operations sent using this provider are sponsored by the Gas Manager
provider = withAlchemyGasManager(provider, {
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

### 5. Linking Provider to the Gas Policy

Use `withAlchemyGasManager` to link your provider to the gas policy. This ensures that user operations sent using this provider are sponsored:

```ts
import { AlchemyProvider } from "@alchemy/aa-alchemy";
import { LightSmartContractAccount } from "@alchemy/aa-accounts";
import { LocalAccountSigner, type SmartAccountSigner } from "@alchemy/aa-core";
import { sepolia } from "viem/chains";
import { withAlchemyGasManager } from "@alchemy/aa-alchemy"; // Importing `withAlchemyGasManager` from `aa-alchemy` that will be used to link Gas Manager to the Light Account for gas sponsorship

const chain = sepolia;
const PRIVATE_KEY = "0xYourEOAPrivateKey";
const eoaSigner: SmartAccountSigner =
  LocalAccountSigner.privateKeyToAccountSigner(`0x${PRIVATE_KEY}`);
const entryPointAddress = "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789";

const GAS_MANAGER_POLICY_ID = "YourGasManagerPolicyId"; // Gas Manager policy id, get yours at https://dashboard.alchemy.com/gas-manager/policy/create //

let provider = new AlchemyProvider({
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

// linking provider to Gas Policy so that the user operations sent using this provider are sponsored by the Gas Manager // [!code focus:5]
provider = withAlchemyGasManager(provider, {
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

### 6. Sending a Sponsored User Operation

Now, you can send a sponsored user operation from your smart account:

```ts
import { AlchemyProvider } from "@alchemy/aa-alchemy";
import { LightSmartContractAccount } from "@alchemy/aa-accounts";
import { LocalAccountSigner, type SmartAccountSigner } from "@alchemy/aa-core";
import { sepolia } from "viem/chains";
import { withAlchemyGasManager } from "@alchemy/aa-alchemy"; // Importing `withAlchemyGasManager` from `aa-alchemy` that will be used to link Gas Manager to the Light Account for gas sponsorship

const chain = sepolia;
const PRIVATE_KEY = "0xYourEOAPrivateKey";
const eoaSigner: SmartAccountSigner =
  LocalAccountSigner.privateKeyToAccountSigner(`0x${PRIVATE_KEY}`);
const entryPointAddress = "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789";

const GAS_MANAGER_POLICY_ID = "YourGasManagerPolicyId"; // Gas Manager policy id, get yours at https://dashboard.alchemy.com/gas-manager/policy/create //

let provider = new AlchemyProvider({
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

// linking provider to Gas Policy so that the user operations sent using this provider are sponsored by the Gas Manager
provider = withAlchemyGasManager(provider, {
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
