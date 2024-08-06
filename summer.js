import { createPublicClient, http } from "viem";
import { mainnet } from "viem/chains";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

const types = ["diamond", "gold", "silver", "bronze"];
const jsonFile = "/abi/abi.json";
const abi = JSON.parse(fs.readFileSync(jsonFile));

const client = createPublicClient({
  chain: mainnet,
  transport: http(
    `https://mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`
  ),
});

function selectRandomType() {
  return types[Math.floor(Math.random() * types.length)];
}

async function getSelectedData(selected) {
  switch (selected) {
    case "diamond":
      const dataDiamond = await client.readContract({
        address: process.env.DIAMOND_ADRESS,
        abi: abi,
        functionName: "getAllMintedTokens",
      });
      return dataDiamond;
    case "gold":
      const dataGold = await client.readContract({
        address: process.env.GOLD_ADDRESS,
        abi: abi,
        functionName: "getAllMintedTokens",
      });
      return dataGold;
    case "silver":
      const dataSilver = await client.readContract({
        address: process.env.SILVER_ADDRESS,
        abi: abi,
        functionName: "getAllMintedTokens",
      });
      return dataSilver;
    case "bronze":
      const dataBronze = await client.readContract({
        address: process.env.BRONZE_ADDRESS,
        abi: abi,
        functionName: "getAllMintedTokens",
      });
      return dataBronze;
    default:
      return [];
  }
}

async function getIdOwner(selected, id) {
  switch (selected) {
    case "diamond":
      const ownerDiamond = await client.readContract({
        address: process.env.DIAMOND_ADRESS,
        abi: abi,
        functionName: "ownerOf",
        args: [id],
      });
      return ownerDiamond;
    case "gold":
      const ownerGold = await client.readContract({
        address: process.env.GOLD_ADDRESS,
        abi: abi,
        functionName: "ownerOf",
        args: [id],
      });
      return ownerGold;
    case "silver":
      const ownerSilver = await client.readContract({
        address: process.env.SILVER_ADDRESS,
        abi: abi,
        functionName: "ownerOf",
        args: [id],
      });
      return ownerSilver;
    case "bronze":
      const ownerBronze = await client.readContract({
        address: process.env.BRONZE_ADDRESS,
        abi: abi,
        functionName: "ownerOf",
        args: [id],
      });
      return ownerBronze;
    default:
      return "";
  }
}

async function main() {
  const selectedRandomType = selectRandomType();
  const selectedData = await getSelectedData(selectedRandomType);
  if (!selectedData) return console.log("Error while getting type data...");

  const winnerID =
    selectedData[Math.floor(Math.random() * selectedData.length)];
  const winnerWallet = await getIdOwner(selectedRandomType, winnerID);

  console.log("Selected type: ", selectedRandomType);
  console.log("Winner ID: ", winnerID.toString());
  console.log("Winner wallet: ", winnerWallet);
}

main()
  .then(() => {
    console.log("---Successfully choosen winner---");
    process.exit();
  })
  .catch((err) => {
    console.log("Error exit!");
    console.log(err);
    console.log("-----\nnested error:", { ...err.error });
    process.exit(1);
  });
