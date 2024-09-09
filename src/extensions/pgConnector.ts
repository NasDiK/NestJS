import Knex from 'knex';
import {pgConfig} from '../config';

export const makeConnection = () => {
  return Knex(pgConfig);
}