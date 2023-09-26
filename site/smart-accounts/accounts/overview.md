---
outline: deep
head:
  - - meta
    - property: og:title
      content: Choosing a Smart Account
  - - meta
    - name: description
      content: Choosing a Smart Account Overview
  - - meta
    - property: og:description
      content: Choosing a Smart Account Overview
---

# Choosing a Smart Account

Now that you have a basic understanding of how to use Account Kit, it's time to dive deeper and talk about different smart accounts.

## What is a Smart Account?

A smart account is a contract controlled by an account owner or other authorized parties. It can be used to manage assets, execute transactions (`userOps`), and more.

## Smart Account Implementations

There are different smart account implementations such as `LightAccount`, `SimpleAccount`, and `ModularAccount` each with its own set of features and tradeoffs. Here we are going to discuss `LightAccount` and `ModularAccount` which can be used in a production environment:

- `LightAccount`: It is a simple, secure, cost-effective and ERC-4337 compliant smart account implementation developed by Alchemy. It supports features such as owner transfers, EIP-1271 message signing and batched transactions. We recommend using Light Account for most use cases. To learn about how to use Light Account with Account Kit, check out the [Light Account](/smart-accounts/accounts/light-account) page.

- `ModularAccount`: It is an [ERC-6900](https://eips.ethereum.org/EIPS/eip-6900) compliant smart account implementation currently being developed by the Alchemy team. It will support all the features of Light Account and more. This also fits in the ERC-4337 ecosystem as ERC-6900 is ERC-4337 compliant as well. The `LightAccount` implementation is forward compatible with `ModularAccount` and we recommend using `LightAccount` until `ModularAccount` is released.

If both of these smart account implementations do not fit your needs, you can always use your own smart account implementation. To learn more about how to do that with Account Kit, check out the page on [Using Your Own Account Implementation](/smart-accounts/accounts/using-your-own).
