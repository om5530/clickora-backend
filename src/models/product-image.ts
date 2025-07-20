import { Table, Attribute, PrimaryKey, AutoIncrement, NotNull, BelongsTo } from "@sequelize/core/decorators-legacy";
import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, NonAttribute } from "@sequelize/core";
import { Product } from "./product";

@Table({
  tableName: "product_images",
  timestamps: false,
})
export class ProductImage extends Model<InferAttributes<ProductImage>, InferCreationAttributes<ProductImage>> {
  @Attribute(DataTypes.INTEGER.UNSIGNED)
  @PrimaryKey
  @AutoIncrement
  declare id: CreationOptional<number>;

  @Attribute(DataTypes.INTEGER.UNSIGNED)
  @NotNull
  declare productId: number;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare imageUrl: string;

  @Attribute(DataTypes.BOOLEAN)
  declare isPrimary?: boolean;

  @BelongsTo(() => Product, "productId")
  declare product?: NonAttribute<Product>;
}
