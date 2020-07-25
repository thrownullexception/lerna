import { Repository, getRepository, getConnection } from 'typeorm';
import * as Path from 'path';
import * as fs from 'fs';
import { isArray, isObject } from 'util';
import { asyncForEach } from '../helpers';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

interface IDependsOn {
  repository: string;
  path: string;
}

interface IObjectFixtureContent {
  data: QueryDeepPartialEntity<any>[];
  dependsOn: IDependsOn[];
}

export class FixturesService {
  constructor() {
    if (process.env.NODE_ENV !== 'test') {
      throw new Error(`This functionality is only for tests`);
    }
  }

  async resetEntityFixtures(entityName: string, path: string): Promise<void> {
    const repository = getRepository(entityName);
    await this.clean(repository);
    await this.load(repository, path);
  }

  async clearEntityFixtures(entityName: string): Promise<void> {
    const repository = getRepository(entityName);
    await this.clean(repository);
  }

  async clean(repository: Repository<any>): Promise<void> {
    try {
      // ALTER TABLE b DISABLE TRIGGER ALL;
      // ALTER TABLE b ENABLE TRIGGER ALL;
      // await repository.query(`SET FOREIGN_KEY_CHECKS=0;`);
      await repository.query(`DELETE FROM ${repository.metadata.tableName};`);
      // await repository.query(`SET FOREIGN_KEY_CHECKS=1;`);
    } catch (error) {
      throw new Error(
        `Tests Entity Cleaning Failed For ${repository.metadata.tableName}: ${error}`,
      );
    }
  }

  private async load(repository: Repository<any>, path: string) {
    try {
      const fixtureFile = Path.join(__dirname, `../../${path}/__tests__/${path}.fixtures.json`);
      if (!fs.existsSync(fixtureFile)) {
        throw new Error(`Fixture Path doesn't exist at ${fixtureFile}`);
      }
      const fixtureContent: QueryDeepPartialEntity<any>[] | IObjectFixtureContent = JSON.parse(
        fs.readFileSync(fixtureFile, 'utf8'),
      );
      if (isArray(fixtureContent)) {
        await this.seedFixtureFile(repository, fixtureContent);
        return;
      }
      if (isObject(fixtureContent)) {
        const { dependsOn, data } = fixtureContent;
        if (!(dependsOn && data)) {
          throw new Error(`Invalid Fixture File: 'dependsOn' and 'data' are the required fields`);
        }
        await this.buildDependsOn(dependsOn);
        await this.seedFixtureFile(repository, data);
      }
    } catch (error) {
      throw new Error(`Tests Fixtures Loading Failed For ${path}: ${error}`);
    }
  }

  private async buildDependsOn(dependsOn: IDependsOn[]) {
    const anyInvalidSchema = dependsOn.some(({ repository, path }) => {
      return !(repository && path);
    });
    if (anyInvalidSchema) {
      throw new Error(`Invalid Depends On Format: 'repository' and 'path' are the required fields`);
    }
    await asyncForEach(dependsOn, async ({ repository, path }) => {
      await this.resetEntityFixtures(repository, path);
    });
  }

  private async seedFixtureFile(repository: Repository<any>, items: QueryDeepPartialEntity<any>[]) {
    if (items.length === 0) {
      return;
    }
    await Promise.all(
      items.map(dataToSeed => {
        const fields = Object.keys(dataToSeed).join(',');
        const values = Object.values(dataToSeed)
          .map(value => `'${value}'`)
          .join(',');
        return repository.query(
          `INSERT INTO ${repository.metadata.tableName} (${fields}) VALUES (${values});`,
        );
      }),
    );
  }
}
