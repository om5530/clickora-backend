import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "@sequelize/core";
import { Attribute, AutoIncrement, PrimaryKey, Table } from "@sequelize/core/decorators-legacy";

@Table({
    tableName: "orders",
    timestamps: true,
})

export class Order extends Model<InferAttributes<Order>, InferCreationAttributes<Order>> {
    
    @Attribute(DataTypes.INTEGER.UNSIGNED)
    @PrimaryKey
    @AutoIncrement
    declare id: CreationOptional<number>;

    @Attribute(DataTypes.INTEGER.UNSIGNED)
    declare userId: number;

    @Attribute(DataTypes.INTEGER.UNSIGNED)
    declare total: number;

    @Attribute(DataTypes.STRING)
    declare status: string; // e.g., "PENDING", "COMPLETED",

    @Attribute(DataTypes.DATE)
    declare createdAt: Date;

    @Attribute(DataTypes.DATE)
    declare updatedAt: Date;

    @Attribute(DataTypes.DATE)
    declare completedAt?: Date;
}