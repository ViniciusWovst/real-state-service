import { MigrationInterface, QueryRunner } from "typeorm"
import { IneLocationDataService } from '../../services/locationData/IneLocationDataService';
import { City } from '../../entity/City';
import { State } from '../../entity/State';
import { Neighborhood } from '../../entity/Neighborhood';

export class populateLocationData1655407766770 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      const connection = queryRunner.manager.connection;
      const listCity = connection.getRepository(City);
      const listState = connection.getRepository(State);
      const listNeighborhood = connection.getRepository(Neighborhood);
      const ineLocationDataService = new IneLocationDataService();
      const {cities, neighborhoods, states } = await ineLocationDataService.getData();
      console.log(cities.length)
    
      const cityData = listCity.create(cities);
      console.log(cityData.length);
      const neighborhoodData = listNeighborhood.create(neighborhoods);
      const stateData = listState.create(states);

      await listCity.save(cityData);
      await listNeighborhood.save(neighborhoodData);
      await listState.save(stateData);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      queryRunner.manager.clear(City);
      queryRunner.manager.clear(State);
      queryRunner.manager.clear(Neighborhood);
    }
}
