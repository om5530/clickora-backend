import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes } from "@sequelize/core";
import { AutoIncrement, PrimaryKey, Table, Attribute } from "@sequelize/core/decorators-legacy";

@Table({
    tableName: "order_items",
    timestamps: true,
})

export class OrderItem extends Model<InferAttributes<OrderItem>, InferCreationAttributes<OrderItem>> {
    @Attribute(DataTypes.INTEGER.UNSIGNED)
    @PrimaryKey
    @AutoIncrement
    declare id: CreationOptional<number>;

    @Attribute(DataTypes.INTEGER.UNSIGNED)
    declare orderId: number;

    @Attribute(DataTypes.INTEGER.UNSIGNED)
    declare productId: number;

    @Attribute(DataTypes.INTEGER.UNSIGNED)
    declare quantity: number;

    @Attribute(DataTypes.FLOAT)
    declare price: number; // Price at the time of order

    @Attribute(DataTypes.DATE)
    declare createdAt: Date;

    @Attribute(DataTypes.DATE)
    declare updatedAt: Date;
}