import * as dotenv from "dotenv"
dotenv.config()

import "@typechain/hardhat"
import "hardhat-contract-sizer"
import "hardhat-dependency-compiler"
import "hardhat-deploy"
import "@nomiclabs/hardhat-ethers"
import { HardhatUserConfig } from "hardhat/config"

const config: HardhatUserConfig = {
    solidity: {
        version: "0.8.1",
        settings: {
            optimizer: { enabled: true, runs: 200 },
            evmVersion: "berlin",
            // for smock to mock contracts
            outputSelection: {
                "*": {
                    "*": ["storageLayout"],
                },
            },
        },
    },
    networks: {
        localhost: {
            allowUnlimitedContractSize: true,
        },
        optimismGoerli: {
            url: process.env.OPTIMISM_GOERLI_WEB3_ENDPOINT,
            accounts: [process.env.POLY_NFT_DEPLOYER]
        },
        scroll: {
            url: "https://alpha-rpc.scroll.io/l2",
            accounts: [process.env.POLY_NFT_DEPLOYER]
        },
        polygonZkEvmTestnet: {
            url: "https://rpc.public.zkevm-test.net",
            accounts: [process.env.POLY_NFT_DEPLOYER]
        }
    },
    namedAccounts: {
        polyNftDeployer: "0xf0d342903C88CFfFf0f4c0934520F1bf86C7b2e6"
    },
    contractSizer: {
        // max bytecode size is 24.576 KB
        alphaSort: true,
        runOnCompile: true,
        disambiguatePaths: true,
        except: ["@openzeppelin/", "test/"],
    },
}

export default config
