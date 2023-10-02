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

## What's a Smart Account?

A smart account is a contract controlled by an account owner or other authorized entities. You can use it to manage assets, carry out transactions (known as `userOps`), and more.

## Kick Off with Light Account

The Light Account offers a straightforward, secure, and cost-effective smart account implementation. It comes equipped with features like owner transfers, EIP-1271 message signing, and batched transactions. For most applications, we recommend using the Light Account.

Here's a snippet that demonstrates how to work with the Light Account using Account Kit. This snippet sets up a Light Account and initiates a User Operation from it:

<!--@include: ../../getting-started.md{56,68}-->

## The Promise of Modular Account Implementation

The Alchemy team is actively developing the Modular Account Implementation, which adheres to the [ERC-6900](https://eips.ethereum.org/EIPS/eip-6900) standard. It's set to include all the features of the Light Account and additional functionalities. Additionally, because ERC-6900 is ERC-4337 compliant, the Modular Account Implementation is well-suited to the ERC-4337 ecosystem. The `LightAccount` design is forward-compatible with `ModularAccount`. Until `ModularAccount` is available, it's a good practice to use `LightAccount`.

If the Light Account doesn't fit your specific needs, you can always use your own smart account implementation with Account Kit. For detailed guidance on this, refer to the guide on [Using Your Own Account Implementation](/smart-accounts/accounts/using-your-own).
