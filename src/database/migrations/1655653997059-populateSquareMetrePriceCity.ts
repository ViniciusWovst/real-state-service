import { MigrationInterface, QueryRunner } from "typeorm"
import { SquareMetrePriceCity } from '../../entity/SquareMetrePriceCity';
import { SquareMetrePriceCityModel } from "../../models/squareMetrePrice/SquareMetrePriceCityModel";
import { INESquareMetrePriceService } from "../../services/squareMetrePrice/INESquareMetrePriceService";

export class populateSquareMetrePriceCity1655653997059 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
      const connection = queryRunner.manager.connection;
      const LIST_PERIOD = [
        '202206',
        '202205',
        '202204',
        '202203',
        '202202',
        '202201',
        '202112',
        '202111',
        '202110',
        '202109',
        '202108',
        '202107',
        '202106',
        '202105',
        '202104',
        '202103',
        '202102',
        '202101',
        '202012',
        '202011',
        '202010',
        '202009',
        '202008',
        '202007',
        '202006',
        '202005',
        '202004',
        '202003',
        '202002',
        '202001',
        '201912',
        '201911',
        '201910',
        '201909',
        '201908',
        '201907',
        '201906',
        '201905',
        '201904',
        '201903',
        '201902',
        '201901',
        '201812',
        '201811',
        '201810',
        '201809',
        '201808',
        '201807',
        '201806',
        '201805',
        '201804',
        '201803',
        '201802',
        '201801',
        '201712',
        '201711',
        '201710',
        '201709',
        '201708',
        '201707',
        '201706',
        '201705',
        '201704',
        '201703',
        '201702',
        '201701',
        '201612',
        '201611',
        '201610',
        '201609',
        '201608',
        '201607',
        '201606',
        '201605',
        '201604',
        '201603',
        '201602',
        '201601',
        '201512',
        '201511',
        '201510',
        '201509',
        '201508',
        '201507',
        '201506',
        '201505',
        '201504',
        '201503',
        '201502',
        '201501',
        '201412',
        '201411',
        '201410',
        '201409',
        '201408',
        '201407',
        '201406',
        '201405',
        '201404',
        '201403',
        '201402',
        '201401',
        '201312',
        '201311',
        '201310',
        '201309',
        '201308',
        '201307',
        '201306',
        '201305',
        '201304',
        '201303',
        '201302',
        '201301',
        '201212',
        '201211',
        '201210',
        '201209',
        '201208',
        '201207',
        '201206',
        '201205',
        '201204',
        '201203',
        '201202',
        '201201',
        '201112',
        '201111',
        '201110',
        '201109',
        '201108',
        '201107',
        '201106',
        '201105',
        '201104',
        '201103',
        '201102',
        '201101'];
    
      const listCity = connection.getRepository(SquareMetrePriceCity);
      const ineSquareMetrePriceService = new INESquareMetrePriceService();
      const cities: SquareMetrePriceCityModel[] =[]; 
      
      for (const period of LIST_PERIOD) {
        const citiesData = await ineSquareMetrePriceService.getCitiesByDate(period);
        cities.push(...citiesData);
      }

    const data = listCity.create(cities);
    await listCity.save(data);
  }

    public async down(queryRunner: QueryRunner): Promise<void> {
      queryRunner.manager.clear(SquareMetrePriceCity);
    }

}
