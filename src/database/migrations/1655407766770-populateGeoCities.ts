import { MigrationInterface, QueryRunner } from "typeorm"
import { GeoCity } from "../../entity/GeoCity";
import OpenDataSoftService from "../../services/geoJson/OpenDataSoftService";

export class populateGeoCities1655407766770 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      const connection = queryRunner.manager.connection;
      const listCity = connection.getRepository(GeoCity);
      const openDataSoftService = new OpenDataSoftService();
      const cities = await openDataSoftService.getCities();
    
      const features = cities.features;
      features.forEach(async(element) =>  {
        const data = listCity.create({...element, country: "portugal"});
        await listCity.save(data);
      });
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      queryRunner.manager.clear(GeoCity);
    }

}
