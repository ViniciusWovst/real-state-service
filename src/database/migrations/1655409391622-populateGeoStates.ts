import { MigrationInterface, QueryRunner } from "typeorm"
import { GeoState } from "../../entity/GeoState";
import OpenDataSoftService from "../../services/CountryData/OpenDataSoftService";

export class populateGeoStates1655409391622 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      const connection = queryRunner.manager.connection;
      const listStates = connection.getRepository(GeoState);
      const openDataSoftService = new OpenDataSoftService();
      const states = await openDataSoftService.getStates();
    
      const features = states.features;
      features.forEach(async(element) =>  {
        const data = listStates.create({...element, country: "portugal"});
        await listStates.save(data);
      });
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      queryRunner.manager.clear(GeoState);
    }

}
