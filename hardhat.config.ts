import * as dotenv from "dotenv";

import { HardhatUserConfig } from "hardhat/config";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";
import 'hardhat-deploy';
import "@nomiclabs/hardhat-ethers";

dotenv.config();
const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.4",
    ...(process.env.DEPLOY === "true" &&
    {
      settings: {
        optimizer: {
          enabled: true,
          runs: 1000,
        },
      },
    }
    )
  },
  namedAccounts: {
    deployer: 0,
  },
  networks: {
    ropsten: {
      url: process.env.ROPSTEN_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    rinkeby: {
      url: process.env.RINKEBY_RPC,
      accounts: [process.env.PRIVATEKEY!]
    },
    kovan: {
      url: "https://kovan.poa.network",
      accounts: [process.env.PRIVATEKEY!],
      gasMultiplier: 1.5,
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
    //gasPrice: 100,
    coinmarketcap: process.env.CMC_API_KEY
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN,
  },
};

export default config;
