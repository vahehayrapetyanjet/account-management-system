import { DataTypes, Model, Optional } from 'sequelize'
import Account from './Account';
import sequelizeConnection from '../config'

export interface TransactionAttributes {
    id: number;
    value?: number;
    transactionDate?: Date;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export interface TransactionInput {
    value?: number;
    transactionDate?: Date;
}

class Transaction extends Model<TransactionAttributes, TransactionInput> implements TransactionAttributes {
    public id!: number
    public value!: number
    public transactionDate!: Date

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
}

Transaction.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    value: {
        type: DataTypes.INTEGER.UNSIGNED
    },
    transactionDate: {
        type: DataTypes.DATE
    }
}, {
  sequelize: sequelizeConnection,
  paranoid: true
})

Transaction.belongsTo(Account)


export default Transaction