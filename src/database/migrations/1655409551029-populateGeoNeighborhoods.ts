import { MigrationInterface, QueryRunner } from "typeorm"
import { GeoNeighborhood } from "../../entity/GeoNeighborhood";
import OpenDataSoftService from "../../services/geoJson/OpenDataSoftService";

export class populateGeoNeighborhoods1655409551029 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      const connection = queryRunner.manager.connection;
      const listNeighborhoods = connection.getRepository(GeoNeighborhood);
      const openDataSoftService = new OpenDataSoftService();
      const neighborhoods = await openDataSoftService.getNeighborhoods();
    
      const features = neighborhoods.features;
      features.forEach(async(element) =>  {
        const data = listNeighborhoods.create({...element, country: "portugal"});
        await listNeighborhoods.save(data);
      });
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      queryRunner.manager.clear(GeoNeighborhood);
    }

}
