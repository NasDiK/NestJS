import '../envConfig';

import { DataSource } from "typeorm"
import * as path from 'path';

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  // entities: [
  //     /*...*/
  // ],
  migrations: [
    path.join(__dirname, '../migrations/*.{ts,js}')
  ],
  migrationsTableName: "typeorm_migration_table",
})

/**
 * npx typeorm-ts-node-commonjs -d .\src\config\typeorm-data-source.ts  migration:run
 */