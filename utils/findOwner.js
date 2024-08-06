import dotenv from "dotenv";
dotenv.config();

import { abi, abiStake, client } from "./getConnection.js";

const FindOwner = async (id, selectedType) => {
  let foundOwner = "";
  let staked = false;

  switch (selectedType) {
    case "Diamond":
      const ownerDiamond = await client.readContract({
        address: process.env.DIAMOND_ADRESS,
        abi: abi,
        functionName: "ownerOf",
        args: [id],
      });
      foundOwner = ownerDiamond;
      break;
    case "Gold":
      const ownerGold = await client.readContract({
        address: process.env.GOLD_ADDRESS,
        abi: abi,
        functionName: "ownerOf",
        args: [id],
      });
      foundOwner = ownerGold;
      break;
    case "Silver":
      const ownerSilver = await client.readContract({
        address: process.env.SILVER_ADDRESS,
        abi: abi,
        functionName: "ownerOf",
        args: [id],
      });
      foundOwner = ownerSilver;
      break;
    case "Bronze":
      const ownerBronze = await client.readContract({
        address: process.env.BRONZE_ADDRESS,
        abi: abi,
        functionName: "ownerOf",
        args: [id],
      });
      foundOwner = ownerBronze;
      break;
    default:
      return "";
  }

  // IF NFT IS STAKED, GET WHO STAKED IT
  if (foundOwner === process.env.STAKE_ADDRESS) {
    console.log(`Staked nft. Getting real owner of ${selectedType} ${id}`);
    const realOwner = await client.readContract({
      address: process.env.STAKE_ADDRESS,
      abi: abiStake,
      functionName: `stakerAddress${selectedType}`,
      args: [id],
    });
    foundOwner = realOwner;
    staked = true;
  }

  return [foundOwner, staked];
};

export default FindOwner;
