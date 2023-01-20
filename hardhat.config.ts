import { HardhatUserConfig } from 'hardhat/config';

import '@oasisprotocol/sapphire-hardhat';
import '@typechain/hardhat';
import '@nomiclabs/hardhat-ethers';
import 'hardhat-watcher';

const accounts = process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [];

const config: HardhatUserConfig = {
  networks: {
    hardhat: {
      chainId: 1337, // @see https://hardhat.org/metamask-issue.html
    },
    'goerli': {
      url: 'https://goerli.infura.io/v3/813e377eac3a4e74b1f7262b3b20b3c6',
      chainId: 5,
      accounts,
    },
    'sepolia': {
      url: 'https://rpc.sepolia.org',
      chainId: 11155111,
      accounts,
    },
    'sapphire-testnet': {
      url: 'https://testnet.sapphire.oasis.dev',
      chainId: 0x5aff,
      accounts,
    },
  },
  solidity: {
    version: '0.8.16',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
      viaIR: true,
    },
  },
  watcher: {
    compile: {
      tasks: ['compile'],
      files: ['./contracts/'],
    },
    test: {
      tasks: ['test'],
      files: ['./contracts/', './test'],
    },
  }
};

export default config;
