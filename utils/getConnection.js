import { createPublicClient, http } from "viem";
import { mainnet } from "viem/chains";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

const jsonFile = "./abi/abi.json";
export const abi = JSON.parse(fs.readFileSync(jsonFile));

const jsonFileStake = "./abi/abiStake.json";
export const abiStake = JSON.parse(fs.readFileSync(jsonFileStake));

export const client = createPublicClient({
  chain: mainnet,
  transport: http(
    `https://mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`
  ),
});
