import FindType from "./findType.js";
import FindOwner from "./findOwner.js";

const SelectWinners = async (data, amount, allWinners, giveawayType) => {
  const winners = [];
  for (let i = 0; i < amount; i++) {
    let selectedNFT = data[Math.floor(Math.random() * data.length)];

    while (allWinners.some((item) => item.debug_nft_id === selectedNFT)) {
      console.log("Same ID selected. Selecting new winner...");
      selectedNFT = data[Math.floor(Math.random() * data.length)];
    }

    const selectedType = FindType(selectedNFT);
    const pureID = selectedNFT.split("-")[0];
    const [owner, staked] = await FindOwner(pureID, selectedType);

    const infoData = {
      id: allWinners.length + 1,
      giveaway: giveawayType,
      nft_id: Number(pureID),
      owner: owner,
      type: selectedType,
      staked: staked,
      debug_nft_id: selectedNFT,
    };

    winners.push(selectedNFT);
    allWinners.push(infoData);
  }
  return winners;
};

export default SelectWinners;
