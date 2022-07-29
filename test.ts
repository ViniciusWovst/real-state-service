import { INESquareMetrePriceService } from './src/services/squareMetrePrice/INESquareMetrePriceService';

async function main() {


  //const listCity = connection.getRepository(SquareMetrePriceCity);
  const ineSquareMetrePriceService = new INESquareMetrePriceService();
  const data = await ineSquareMetrePriceService.getCitiesByDate('202204');
  console.log(data[2], data.length)

}

main();

