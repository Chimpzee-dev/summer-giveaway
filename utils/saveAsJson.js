import fs from "fs";

const SaveAsJson = (data) => {
  const editedData = JSON.stringify(data, null, 2);
  fs.writeFileSync("./results/results.json", editedData, "utf8", (err) => {
    if (err) {
      return console.log("Error while saving as json file");
    }
    console.log("The json file was saved!");
  });
};

export default SaveAsJson;
