

export const convertToNumberWithoutComma = (number) => {
  let result;
  if(number.includes('-')){
    result = number.split('-').map((elem) => Number(elem))[0];
  }else{
    result = parseInt(number.replace(/,/g, ""), 10);
  }
  if (!isNaN(result)) {
    return result;
  } else {
    return null;
  }
};

export const filterTheStarShipsBasedOnFilmsAppeared = (starShips) => {
  let maxFilmsAppearedVehicle = -1;
  const filteredData = starShips.filter((starShip) => {
    const crewNumber = convertToNumberWithoutComma(starShip.crew);
    if (Number(crewNumber) < 10) {
      if(starShip.films.length > maxFilmsAppearedVehicle){
        maxFilmsAppearedVehicle = starShip.films.length;
      }
      return true;
    }
  }).map((record) => {
    return {
      ...record,
      maximumTimeAppeared:
        maxFilmsAppearedVehicle === record.films.length,
        crew: Number(record.crew)
    };
  }).sort((a, b) => a.crew - b.crew);
  console.log(filteredData);
  return filteredData;
}