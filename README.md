# Token faucet
> A token factory to spawn free testnet tokens

Features:
- Same address on all chains (it's deterministic and anyone can deploy it)
- Minting is limited so nobody can grief by minting a lot of tokens and cause overflows
- Gives creator the ability to mint as much as they want and change the mint limit

## Why
Every protocol that deploys on testnet needs tokens to test, and currently what's happening is that everyone is rolling their own mock tokens.

This project is our attempt at simplifying testnet development by creating a simple token factory that anyone can use to spin their own tokens.

There's been some projects that built generic tokens in the past, but their main issues is that they only deployed a single token and they were griefable by anyone that minted tokens up to the uint256 limit, which would make further mints break due to overflow. This project enforces a limit to each mint so you can share the contracts with testers and don't have to worry about anyone griefing them.

## Addresses

Addresses are the same for all chains except for avalanche's fuji testnet
| Contract | Address |
|----------|---------|
| Factory  | 0x806720a305F100F08A48dC3E663C223A378Fe9F9
| USDC | 0x3861e9F29fcAFF738906c7a3a495583eE7Ca4C18
| DAI | 0x332C7aC34580dfEF553B7726549cEc7015C4B39b
| USDT | 0x0aCBd07e458F228d4869066b998a0F55F36537B2
| WBTC | 0xaFb85F66FC8ad94805b586BE06dAc02876a0a5E5
| WETH | 0x58d7ccbE88Fe805665eB0b6c219F2c27D351E649

For Avalanche:
| Contract | Address |
|----------|---------|
| Factory  | 0x4dDFc224e5DA184dC458769491cb2F17E37567B7
| USDC | 0x68b56283f6C6AC75489B63D09288Dfa2bea104A1
| DAI | 0x36861654d8E5e0a641085603a8E7cb88E5419d31
| USDT | 0x8Cf18401B5cC31176bE8F9d6f586a64506B583F1
| WBTC | 0xAF64a37533E76A2Ff19Dda45806c157037A30FAd
| WETH | 0x330f5B4784100d8eD4DeFb8D80C411BDA435205C

## Usecase example
![](./example.png)

----

## Development

### Contracts
Anyone can deploy these to any EVM network (at the same address!), so feel free to deploy them everywhere
```shell
npm test
npx hardhat coverage
npx hardhat deploy --network rinkeby
npx hardhat etherscan-verify --network rinkeby
npx hardhat verify 0x3861e9F29fcAFF738906c7a3a495583eE7Ca4C18 --network rinkeby
```

### Frontend
```shell
yarn # install packages
yarn dev # run local server for development
```
