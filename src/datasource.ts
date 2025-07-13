import { Sequelize, Op } from "@sequelize/core";
import { PostgresDialect } from "@sequelize/postgres";
import dotenv from 'dotenv';

dotenv.config();

const models = []; // add your model references here

const sequelize = new Sequelize({
  dialect: PostgresDialect,
  database: process.env.PG_DB,
  user: process.env.PG_USER,
  password: process.env.PG_PASS,
  host: process.env.PG_HOST,
  port: Number(process.env.PG_PORT),
  ssl: process.env.PG_SSL === 'true' ? { rejectUnauthorized: false } : false,
  clientMinMessages: 'notice',
});


export { sequelize, models, Op };
