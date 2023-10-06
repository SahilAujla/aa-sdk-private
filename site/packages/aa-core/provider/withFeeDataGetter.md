---
outline: deep
head:
  - - meta
    - property: og:title
      content: ISmartAccountProvider • withFeeDataGetter
  - - meta
    - name: description
      content: Overview of the withFeeDataGetter method on ISmartAccountProvider
  - - meta
    - property: og:description
      content: Overview of the withFeeDataGetter method on ISmartAccountProvider
---

# withFeeDataGetter

Override the default fee data getter middleware. This middleware is used for setting the `maxFeePerGas` and `maxPriorityFeePerGas` fields on the `UserOperation` prior to its execution.

## Usage

::: code-group

```ts [example.ts]
import { provider } from "./provider";

provider.withFeeDataGetter(FeeDataMiddlewareOverrideFunction);
```

<<< @/snippets/provider.ts
:::

## Returns

### `ISmartAccountProvider`

An updated instance of the provider, which now uses the overridden fee data getter middleware.

## Parameters

### `override: FeeDataMiddleware`

A function for overriding the default `feeDataGetter` middleware. This middleware is specifically utilized to set the fee-related fields (`maxFeePerGas` and `maxPriorityFeePerGas`) on the `UserOperation` before it's executed.

### About FeeDataMiddleware

`FeeDataMiddleware` is a type of `AccountMiddlewareOverrideFn` that specifically targets the `maxFeePerGas` and `maxPriorityFeePerGas` fields of the `UserOperationStruct`.

#### AccountMiddlewareOverrideFn Definition:

This function type is designed to potentially modify specific fields (required or optional) in the `UserOperationStruct`.

- **Req**: Specifies the fields of `UserOperationStruct` that must be provided.
- **Opt**: Specifies the fields of `UserOperationStruct` that can optionally be provided.

The function takes in a `Deferrable<UserOperationStruct>` and returns a Promise that will resolve to a modified version of the `UserOperationStruct`, which includes the fields specified by `Req` and may include those specified by `Opt`.

#### UserOperationStruct:

This interface provides a structure for building user operation requests. Key fields include:

- **sender**: The origin of the request.
- **nonce**: The nonce of the transaction.
- **initCode**: The initCode for creating the sender if not existing.
- **callData**: The data passed to the target.
- **maxFeePerGas**: Maximum fee per gas (similar to EIP-1559 max_fee_per_gas).
- **maxPriorityFeePerGas**: Maximum priority fee per gas (similar to EIP-1559 max_priority_fee_per_gas).
- ... (other fields)
