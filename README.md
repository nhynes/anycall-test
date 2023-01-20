# Usage

First ensure that there's at least 1.5 ROSE in your Sapphire Testnet wallet.
Then, run the following commands:

```
pnpm install
pnpm build
PRIVATE_KEY='0x...' pnpm hardhat --network sapphire-testnet run scripts/run-test.ts
```
