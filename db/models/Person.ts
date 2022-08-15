import { DataTypes, Model,  Optional } from 'sequelize'
import sequelizeConnection from '../config'

export interface PersonAttributes {
    id: number;
    name: string;
    document?: string;
    birthDate?: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export interface PersonInput {
    name: string;
    document?: string;
    birthDate?: string;
}


class Person extends Model<PersonAttributes, PersonInput> implements PersonAttributes {
    public id!: number
    public name!: string
    public document!: string
    public birthDate!: string

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
}

Person.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    document: {
        type: DataTypes.TEXT
    },
    birthDate: {
        type: DataTypes.DATE
    }
}, {
  sequelize: sequelizeConnection,
  paranoid: true
})

export default Person