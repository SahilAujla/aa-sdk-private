---
outline: deep
head:
  - - meta
    - property: og:title
      content: ISmartAccountProvider • withCustomMiddleware
  - - meta
    - name: description
      content: Overview of the withCustomMiddleware method on ISmartAccountProvider
  - - meta
    - property: og:description
      content: Overview of the withCustomMiddleware method on ISmartAccountProvider
---

# withCustomMiddleware

This method adds a final middleware step to the middleware stack that runs right before signature verification. It can be utilized when there's an RPC that fulfills most of the functionalities of the other middlewares. Instead of chaining multiple RPC calls via the default middlewares, you can delegate the work to that RPC.

## Usage

::: code-group

```ts [example.ts]
import { provider } from "./provider";

// [!code focus:99]
provider.withCustomMiddleware(CustomMiddlewareOverrideFunction);
```

<<< @/snippets/provider.ts
:::

## Returns

### `ISmartAccountProvider`

An updated instance of the provider, which now uses the custom middleware.

## Parameters

### `override: AccountMiddlewareFn`

The User Operation (UO) transform function that will run as the custom middleware.

## `customMiddleware`

The `customMiddleware` is a readonly field that represents the final middleware step in the stack. It allows overriding any of the results returned by previous middlewares, ensuring customized processing of user operations.

You can access the current middleware configuration for the provider via:

```ts
const currentMiddleware = provider.customMiddleware;
```
