import dotenv from "dotenv";
import {
  GetDiamondData,
  GetGoldData,
  GetSilverData,
  GetBronzeData,
} from "./utils/getNfts.js";
import SelectWinners from "./utils/selectWinners.js";
import shuffle from "./utils/shuffleArray.js";
import SaveAsJson from "./utils/saveAsJson.js";
import SaveAsExcel from "./utils/saveAsExcel.js";
dotenv.config();

async function main() {
  let allWinners = [];

  const diamondData = await GetDiamondData();
  const goldData = await GetGoldData();
  const silverData = await GetSilverData();
  const bronzeData = await GetBronzeData();

  if (!diamondData || !goldData || !silverData || !bronzeData)
    return console.log("Error while getting nft data...");

  // COMBINE ALL TYPES OF PASSPORTS INTO ONE AND SHUFFLE
  const combinedData = shuffle(
    diamondData.concat(goldData, silverData, bronzeData)
  );

  // SELECT 10.000$ ANY WINNERS
  const tenKWinners = await SelectWinners(
    combinedData,
    2,
    allWinners,
    "Any 10k giveaway"
  );
  console.log("10K winners: ", tenKWinners);

  // SELECT 5.000$ DIAMOND WINNER
  const diamondWinners = await SelectWinners(
    shuffle(diamondData),
    1,
    allWinners,
    "Diamond giveaway"
  );
  console.log("Diamond winners: ", diamondWinners);

  // SELECT 2.500$ GOLD WINNERS
  const goldWinners = await SelectWinners(
    shuffle(goldData),
    2,
    allWinners,
    "Gold giveaway"
  );
  console.log("Gold winners: ", goldWinners);

  // SELECT 1.000$ SILVER WINNERS
  const silverWinners = await SelectWinners(
    shuffle(silverData),
    3,
    allWinners,
    "Silver giveaway"
  );
  console.log("Silver winners: ", silverWinners);

  // SELECT 500$ BRONZE WINNERS
  const bronzeWinners = await SelectWinners(
    shuffle(bronzeData),
    4,
    allWinners,
    "Bronze giveaway"
  );
  console.log("Bronze winners: ", bronzeWinners);

  // SELECT 250$ ANY WINNERS
  const smallWinners = await SelectWinners(
    combinedData,
    20,
    allWinners,
    "Any 250 giveaway"
  );
  console.log("250$ winners: ", smallWinners);

  // LOG ALL WINNERS
  console.log(
    "All winners: ",
    allWinners.map((item) => item.debug_nft_id)
  );

  // SAVE ALL DATA AS JSON AND EXCEL
  SaveAsJson(allWinners);
  SaveAsExcel(allWinners);
}

main()
  .then(() => {
    console.log("---Successfully choosen winners---");
    process.exit();
  })
  .catch((err) => {
    console.log("Error exit!");
    console.log(err);
    console.log("-----\nnested error:", { ...err.error });
    process.exit(1);
  });
