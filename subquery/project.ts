import {
  EthereumProject,
  EthereumDatasourceKind,
  EthereumHandlerKind,
} from "@subql/types-ethereum";

import * as dotenv from "dotenv";
import path from "path";

const mode = process.env.NODE_ENV || "production";

// Load the appropriate .env file
const dotenvPath = path.resolve(
  __dirname,
  `.env${mode !== "production" ? `.${mode}` : ""}`
);
dotenv.config({ path: dotenvPath });

const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS!;

// Can expand the Datasource processor types via the generic param
const project: EthereumProject = {
  specVersion: "1.0.0",
  version: "0.0.1",
  name: "celo-starter",
  description:
    "This project can be used as a starting point for developing your new Celo Mainnet SubQuery project",
  runner: {
    node: {
      name: "@subql/node-ethereum",
      version: ">=3.0.0",
    },
    query: {
      name: "@subql/query",
      version: "*",
    },
  },
  schema: {
    file: "./schema.graphql",
  },
  network: {
    chainId: process.env.CHAIN_ID!,
    endpoint: process.env.ENDPOINT!?.split(",") as string[] | string,
  },
  dataSources: [
    {
      kind: EthereumDatasourceKind.Runtime,
      startBlock: 26674765, // This should be the block number when your contract was deployed
      options: {
        abi: "chaindelAbi",
        address: CONTRACT_ADDRESS,
      },
      assets: new Map([["chaindelAbi", { file: "./abis/chaindel.abi.json" }]]),
      mapping: {
        file: "./dist/index.js",
        handlers: [
          {
            kind: EthereumHandlerKind.Call,
            handler: "handleTransaction",
            filter: {
              function: "createOrder(string,uint256,uint256)",
            },
          },
          {
            kind: EthereumHandlerKind.Call,
            handler: "handleTransaction",
            filter: {
              function: "deliverOrder(uint256)",
            },
          },
          {
            kind: EthereumHandlerKind.Call,
            handler: "handleTransaction",
            filter: {
              function: "pickUpOrder(uint256)",
            },
          },
          {
            kind: EthereumHandlerKind.Event,
            handler: "handleLog",
            filter: {
              topics: [
                "Created(uint256,string,address,uint256)",
                "Delivered(uint256)",
                "PickedUp(uint256,address)",
              ],
            },
          },
        ],
      },
    },
  ],
  repository: "https://github.com/subquery/ethereum-subql-starter",
};

export default project;
