const FindType = (id) => {
  const foundType = id.split("-")[1];

  switch (foundType) {
    case "d":
      return "Diamond";
    case "g":
      return "Gold";
    case "s":
      return "Silver";
    case "b":
      return "Bronze";
    default:
      return "Not found";
  }
};

export default FindType;
