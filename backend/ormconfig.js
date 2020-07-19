require('dotenv').config();
const path = require('path');
const { SnakeNamingStrategy } = require('typeorm-naming-strategies');
const { NODE_ENV } = process.env;
const MIGRATIONS_DIR = path.join('.', 'database');
const relativeMigrationsDir = path.join.bind(path, MIGRATIONS_DIR);

const commonConfig = {
  type: 'postgres',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  logging: NODE_ENV !== 'production',
  acquireTimeout: 30000,
  connectTimeout: 30000,
  retryAttempts: 5,
  namingStrategy: new SnakeNamingStrategy(),
  cache: {
    type: "redis",
    options: {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      password: process.env.REDIS_PASSWORD
    },
  }
};

if (NODE_ENV === 'testing') {
  commonConfig.database = commonConfig.database + '_test';
}

module.exports = [
  {
    ...commonConfig,
    name: 'seed',
    migrations: [relativeMigrationsDir('/seeds/*{.ts,.js}')],
    migrationsTableName: 'seeds',
    cli: {
      migrationsDir: relativeMigrationsDir('seeds'),
    },
  },
  {
    ...commonConfig,
    name: 'dev-seed',
    migrations: [relativeMigrationsDir('/dev-seeds/*{.ts,.js}')],
    migrationsTableName: 'dev-seeds',
    cli: {
      migrationsDir: relativeMigrationsDir('dev-seeds'),
    },
  },
  {
    ...commonConfig,
    name: 'default',
    migrations: [relativeMigrationsDir('/migrations/*{.ts,.js}')],
    migrationsTableName: 'migrations',
    cli: {
      migrationsDir: relativeMigrationsDir('migrations'),
    },
  }
];
