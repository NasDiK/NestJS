import { Knex } from 'knex';
import * as PG from './pgConnector';
import * as ConsoleLogger  from './logger';

export type Extensions = {
  pg: () => Knex,
  loggerBuilder: (prefix: string) => ConsoleLogger.Logger
};

export const buildExtensions = () => {

  const result: Extensions = {
    pg: () => PG.makeConnection(),
    loggerBuilder: (prefix) => new ConsoleLogger.Logger(prefix)
  };

  return result;
}