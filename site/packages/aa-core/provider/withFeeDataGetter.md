---
outline: deep
head:
  - - meta
    - property: og:title
      content: ISmartAccountProvider • withFeeDataGetter
  - - meta
    - name: description
      content: Overview of the withFeeDataGetter method and accessing the feeDataGetter readonly field on ISmartAccountProvider
  - - meta
    - property: og:description
      content: Overview of the withFeeDataGetter method and accessing the feeDataGetter readonly field on ISmartAccountProvider
---

# withFeeDataGetter

Override the default `feeDataGetter` middleware. This middleware is used for setting the `maxFeePerGas` and `maxPriorityFeePerGas` fields on the `UserOperation` prior to its execution.

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

## `feeDataGetter`

The `feeDataGetter` is a readonly field on the `ISmartAccountProvider` interface that represents the default fee data getter middleware. It's used to set the fee-related fields on a `UserOperation` by making calls to the connected `rpcClient` to estimate the maximum priority fee per gas and retrieve fee data.

You can access the current fee data getter configuration for the provider via:

```ts
const currentFeeDataGetter = provider.feeDataGetter;
```
