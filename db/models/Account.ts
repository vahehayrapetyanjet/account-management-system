import { DataTypes, Model } from 'sequelize'
import sequelizeConnection from '../config'
import Person from './Person'

export enum AccountTypes {
    User = 1
}

export interface AccountAttributes {
    id: number;
    balance?: number;
    delayWithDrawalLimit?: number;
    activeFlag: boolean;
    type: AccountTypes;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export interface AccountInput {
    balance?: number;
    delayWithDrawalLimit?: number;
    activeFlag: boolean;
    type: AccountTypes;
    PersonId: number
}

class Account extends Model<AccountAttributes, AccountInput> implements AccountAttributes {
    public id!: number
    public balance!: number
    public delayWithDrawalLimit!: number
    public activeFlag!: boolean
    public type!: AccountTypes

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
}

Account.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    type: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    balance: {
        type: DataTypes.INTEGER
    },
    delayWithDrawalLimit: {
        type: DataTypes.INTEGER
    },
    activeFlag: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
}, {
  sequelize: sequelizeConnection,
  paranoid: true
})

Account.belongsTo(Person)

export default Account