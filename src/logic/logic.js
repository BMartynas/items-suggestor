import * as items from './items';

export default (kilometers, startDate, endDate) => {

    let duration = calculateDurationInDays(startDate, endDate); 
    let season = getYearSeason(startDate);
    let neededItems = getNeededItems(kilometers, duration, season);

    return neededItems;
}

const calculateDurationInDays = (startDate, endDate) => {
    let oneDay = 24 * 60 * 60 * 1000;
    let durationInDays = Math.round(Math.abs((startDate - endDate) / oneDay));

    return durationInDays;
}

const getYearSeason = (date) => {
    let month = date.getMonth();

    if (month >= 2 && month <= 4) 
        return 'spring';
    else if (month >= 5 && month <= 7) 
        return 'summer';
    else if (month >= 8 && month <= 10)
        return 'autumn';
    else return 'winter';
}

const getNeededItems = (kilometers, duration, season) => {
    let itemsNeeded = []; 
    
    if (duration >= 1 ) {
        for (let [key, value] of Object.entries(items.sleepEquipment)) {
            itemsNeeded.push(value);
          }
    }

    for (let [key, value] of Object.entries(items.dailyFoodRation)) {
        let numberOfItems = value.quantity * (duration + 1);
        let item = {
            name: value.name,
            quantity: numberOfItems
        }
        itemsNeeded.push(item);
      }

      for (let [key, value] of Object.entries(items.generalItems)) {
        itemsNeeded.push(value);
      }
    
    if (kilometers >=20) {
        for (let [key, value] of Object.entries(items.longDistancesEquipment)) {
            itemsNeeded.push(value);
          }
    }
    switch(season) {
        case 'spring':
            for (let [key, value] of Object.entries(items.springItems)) {
                itemsNeeded.push(value);
              }
            break;
        case 'summer':
            for (let [key, value] of Object.entries(items.summerItems)) {
                itemsNeeded.push(value);
              }
            break;
        case 'autumn':
            for (let [key, value] of Object.entries(items.autumnItems)) {
                itemsNeeded.push(value);
              }
            break;
        default:
            for (let [key, value] of Object.entries(items.winterItems)) {
                itemsNeeded.push(value);
              }
      }

    return itemsNeeded;
}