import dotenv from "dotenv";
dotenv.config();

import { abi, client } from "./getConnection.js";

export const GetDiamondData = async () => {
  const dataDiamond = await client.readContract({
    address: process.env.DIAMOND_ADRESS,
    abi: abi,
    functionName: "getAllMintedTokens",
  });
  const editedArray = dataDiamond.map((id) => `${id}-d`);
  return editedArray;
};

export const GetGoldData = async () => {
  const dataGold = await client.readContract({
    address: process.env.GOLD_ADDRESS,
    abi: abi,
    functionName: "getAllMintedTokens",
  });
  const editedArray = dataGold.map((id) => `${id}-g`);
  return editedArray;
};

export const GetSilverData = async () => {
  const dataSilver = await client.readContract({
    address: process.env.SILVER_ADDRESS,
    abi: abi,
    functionName: "getAllMintedTokens",
  });
  const editedArray = dataSilver.map((id) => `${id}-s`);
  return editedArray;
};

export const GetBronzeData = async () => {
  const dataBronze = await client.readContract({
    address: process.env.BRONZE_ADDRESS,
    abi: abi,
    functionName: "getAllMintedTokens",
  });
  const editedArray = dataBronze.map((id) => `${id}-b`);
  return editedArray;
};
