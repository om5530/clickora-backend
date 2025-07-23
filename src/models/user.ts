import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from "@sequelize/core";
import { Attribute, PrimaryKey, AutoIncrement, NotNull, Unique, Table, Default } from "@sequelize/core/decorators-legacy";

export enum UserType {
  ADMIN = "ADMIN",
  USER = "USER",
}

export enum UserStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  INVITED = "INVITED",
}

export enum Salutation {
  MR = "Mr.",
  MRS = "Mrs.",
  MS = "Ms.",
  MISS = "Miss",
  DR = "Dr.",
  PROF = "Prof.",
  ENGR = "Engr.",
  MX = "Mx.",
  NONE = "",
}

@Table({
  timestamps: true,
  paranoid: true,
  tableName: "users",
})

export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  @Attribute(DataTypes.INTEGER.UNSIGNED)
  @PrimaryKey
  @AutoIncrement
  declare id: CreationOptional<number>;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare username?: string;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare salutation: Salutation;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare firstName: string;

  @Attribute(DataTypes.STRING)
  declare lastName: string | null;

  @Attribute(DataTypes.STRING)
  @NotNull
  @Unique
  declare email: string;

  @Attribute(DataTypes.STRING)
  declare countryCode?: string;

  @Attribute(DataTypes.STRING)
  declare phone?: string;

  @Attribute(DataTypes.STRING)
  declare status: UserStatus

  @Attribute(DataTypes.STRING)
  declare password: string;

  @Attribute(DataTypes.DATE)
  declare LastLogin: Date;

  @Attribute(DataTypes.BOOLEAN)
  @Default(false)
  declare rememberMe?: boolean;
}
