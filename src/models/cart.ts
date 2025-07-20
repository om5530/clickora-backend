import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "@sequelize/core";
import { AutoIncrement, NotNull, PrimaryKey, Table, Attribute, Unique, Default } from "@sequelize/core/decorators-legacy";

@Table({
  timestamps: true,
  tableName: "cart",
})
export class Cart extends Model<InferAttributes<Cart>, InferCreationAttributes<Cart>> {
  @Attribute(DataTypes.INTEGER.UNSIGNED)
  @PrimaryKey
  @AutoIncrement
  declare id: CreationOptional<number>;
 
  @Attribute(DataTypes.INTEGER.UNSIGNED)
  @NotNull
  declare userId: number;

  @Attribute(DataTypes.INTEGER.UNSIGNED)
  @NotNull
  declare productId: number;

  @Attribute(DataTypes.INTEGER.UNSIGNED)
  @NotNull
  @Default(1)
  declare quantity: number;

  @Attribute(DataTypes.DATE)
  @NotNull
  declare createdAt: Date;  

  @Attribute(DataTypes.DATE)
  @NotNull
  declare updatedAt: Date;

}
