import fs from "fs";
import json2xls from "json2xls";

const SaveAsExcel = (data) => {
  const excelFile = json2xls(data);

  fs.writeFileSync("./results/results.xlsx", excelFile, "binary", (err) => {
    if (err) {
      return console.log("Error while saving as json file");
    }
    console.log("The excel file was saved!");
  });
};

export default SaveAsExcel;
