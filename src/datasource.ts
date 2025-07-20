import { Sequelize, Op } from "@sequelize/core";
import { PostgresDialect } from "@sequelize/postgres";
import dotenv from 'dotenv';
import { User } from "./models/user";
import { Product } from "./models/product";
import { ProductImage } from "./models/product-image";
import { Order } from "./models/order";
import { OrderItem } from "./models/order-item";
import { Cart } from "./models/cart";

dotenv.config();

const models = {
  User,
  Product,
  ProductImage,
  Order,
  OrderItem,
  Cart
};

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
