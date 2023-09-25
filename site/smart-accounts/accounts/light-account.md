---
outline: deep
head:
  - - meta
    - property: og:title
      content: Using Light Account
  - - meta
    - name: description
      content: Using Light Account with Account Kit
  - - meta
    - property: og:description
      content: Using Light Account with Account Kit
---

# Light Account

Light Account is a simple, secure, and cost-effective smart account implementation. It supports features such as owner transfers, EIP-1271 message signing and batched transactions. We recommend using Light Account for most use cases.

## Using Light Account

The code snippet below demonstrates the usage of Light Account with Account Kit. It creates a Light Account and sends a User Operation from it:

<<< @/snippets/light-account.ts

::: tip Note
Remember to:

1. Replace `"0xYourEOAPrivateKey"` with your actual EOA private key.
2. Set `"ALCHEMY_API_KEY"` with your unique Alchemy API key.
3. Adjust the `target` and `data` fields in the `sendUserOperation` function to match your requirements.
   :::
