import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "@sequelize/core";
import {
  AutoIncrement,
  NotNull,
  PrimaryKey,
  Table,
  Attribute,
  Unique,
  Default,
} from "@sequelize/core/decorators-legacy";

@Table({
  timestamps: true,
  tableName: "products",
})
export class Product extends Model<InferAttributes<Product>, InferCreationAttributes<Product>> {
  @Attribute(DataTypes.INTEGER.UNSIGNED)
  @PrimaryKey
  @AutoIncrement
  declare id: CreationOptional<number>;

  @Attribute(DataTypes.STRING)
  @NotNull
  @Unique
  declare name: string;

  @Attribute(DataTypes.STRING)
  @NotNull
  @Unique
  declare shortCode: string;

  @Attribute(DataTypes.TEXT)
  declare description?: string;

  @Attribute(DataTypes.FLOAT)
  @NotNull
  declare price: number;

  @Attribute(DataTypes.INTEGER.UNSIGNED)
  @NotNull
  declare stock: number;

  @Attribute(DataTypes.STRING)
  declare brand?: string;

  @Attribute(DataTypes.STRING)
  declare category?: string;

  @Attribute(DataTypes.JSON)
  declare tags?: string[];

  @Attribute(DataTypes.FLOAT)
  @Default(0)
  declare rating: number;

  @Attribute(DataTypes.INTEGER)
  @Default(0)
  declare soldCount: number;

  @Attribute(DataTypes.BOOLEAN)
  @Default(true)
  declare isActive: boolean;

  @Attribute(DataTypes.DATE)
  @NotNull
  declare createdAt: CreationOptional<Date>;

  @Attribute(DataTypes.DATE)
  @NotNull
  declare updatedAt: CreationOptional<Date>;
}
