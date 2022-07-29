import { AppDataSource } from "../../data-source";
import {GeoCity} from "../../entity/GeoCity";
import { SquareMetrePriceCity } from '../../entity/SquareMetrePriceCity';
import "datejs"
import { City } from '../../entity/City';
import { PropertyType } from '../../models/squareMetrePrice/SquareMetrePriceBase';

export class CityService {
  private getPropertyAveragePrice(propertyType: PropertyType, data: SquareMetrePriceCity[]) {
    if (data.length === 0) return 0; 
    const dataFiltered = data.filter(item => item.propertyType === propertyType);
    return dataFiltered.reduce((a , b) => a + b.price, 0)/ dataFiltered.length;
  }

  private getPropertyAveragePercentPrice(propertyType: PropertyType, data: SquareMetrePriceCity[]) {
    if (data.length === 0) return 0; 
    let totalPercent = 0;
    const dataFiltered = data.filter(item => item.propertyType === propertyType);
    dataFiltered.reduce((a , b) =>  {
      const decreaseValue = a.price-b.price;
      totalPercent += (decreaseValue/a.price)*100;
      return b;
    });
    return totalPercent;

  }

  async getCityData(cityCode: string) {
    const cityDataReposity = AppDataSource.manager.connection.getMongoRepository(City);
    const cityData = await cityDataReposity.findOne({where: {code: cityCode}});
    return cityData 

  }

  async getSquareMetrePriceData(cityCode: string) {
    const squareMetrePriceRepository = AppDataSource.manager.connection.getMongoRepository(SquareMetrePriceCity);

     // if post was not found return 404 to the client
    let endDate =  new Date().clearTime().moveToFirstDayOfMonth().addMonths(-4);
    let endDate2 =  new Date().clearTime().moveToFirstDayOfMonth().addMonths(-2);
    let endDate3 =  new Date().clearTime().moveToFirstDayOfMonth().addMonths(-3); 
    const squareMetrePrice = await squareMetrePriceRepository.find(
      {        
      where: {
        code: cityCode,
        $or: [{
          period: endDate
        },
        {
          period: endDate2
        },
        {
          period: endDate3
        },
      ]
      }
    });
    const percentPriceHouse = Number(this.getPropertyAveragePercentPrice( "house", squareMetrePrice).toFixed(2));
    const percentPriceApartment = Number(this.getPropertyAveragePercentPrice( "apartment", squareMetrePrice).toFixed(2));
    const averagePriceHouse = Number(this.getPropertyAveragePrice( "house", squareMetrePrice).toFixed(2));
    const averagePriceApartment = Number(this.getPropertyAveragePrice( "apartment", squareMetrePrice).toFixed(2));
    
    const pricePerPeriod = squareMetrePrice.map(item => {
      const {price, period, propertyType} = item;
      return {
        price, 
        period, 
        propertyType,
      }
    })

    return {
      currency: squareMetrePrice[0].currency, 
      house: {
        sale: {
        averagePriceLastMonths: averagePriceHouse,
        percentPriceHouseLastMonths: percentPriceHouse,
        squareMetrePriceHistoric: pricePerPeriod.filter(item => item.propertyType === 'house')
        },
        rent: {

        }
      },
      apartment: {
        sale: {
          averagePriceLastMonths: averagePriceApartment,
          percentPriceHouseLastMonths: percentPriceApartment,
          squareMetrePriceHistoric: pricePerPeriod.filter(item => item.propertyType === 'apartment')
        },
        rent: {

        }
      }
    }

  }

  async getCity(cityCode: string) {
    const geoCityRepository = AppDataSource.manager.connection.getRepository(GeoCity);
    const city = await geoCityRepository.findOne({
      where: {'properties.code':  cityCode}
      } as any);
    
    if (!city) {
      return null
    }
    const cityData = await this.getCityData(cityCode);

    let newProperties = {};
      if (city) {
        const squareMetrePrice = await this.getSquareMetrePriceData(cityCode);

        newProperties =  {
          ...city.properties, 
          habitableArea: cityData?.habitableArea, 
          image: cityData?.image,
          ...squareMetrePrice,
        };
      };
      return { ...city, properties: newProperties}
  }

  async getCities() {
    const geoCityRepository = AppDataSource.manager.connection.getRepository(GeoCity);
    const cities = await geoCityRepository.find();
    const citiesList = [];
    for (const city of cities) {
      const cityData = await this.getCityData(city.properties.code);

    let newProperties = {};
      if (city) {
        const squareMetrePrice = await this.getSquareMetrePriceData(city.properties.code);

        newProperties =  {
          ...city.properties, 
          habitableArea: cityData?.habitableArea, 
          image: cityData?.image,
          ...squareMetrePrice,
        };
      };
      citiesList.push({ ...city, properties: newProperties})
    }
    return citiesList;
  }
}