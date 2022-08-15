import Ajv from 'ajv'
import { Op } from 'sequelize'
import addFormats from 'ajv-formats'
import { Transaction } from '../models'
import { TransactionAttributes, TransactionInput } from '../models/Transaction'

const ajv = new Ajv();
addFormats(ajv);

const schema = {
  type: 'object',
  properties: {
    value: { type: 'number' },
    transactionDate:  { type: 'string', format: 'date-time' },
  },
  required: ['value', 'transactionDate'],
  additionalProperties: false
}
export interface Query {
    where?: {
        createdAt?: {
            [Op.between]: string[]
        },
        AccountId?: number
    }
}

const validateSchema = ajv.compile(schema)

export const validate = (payload: TransactionInput) => {
    return validateSchema(payload);
}
export const create = async (payload: TransactionInput): Promise<TransactionAttributes> => {
    return Transaction.create(payload)
}

export const update = async (id: number, payload: Partial<TransactionInput>): Promise<TransactionAttributes>  => {
    const ingredient = await Transaction.findByPk(id)

    if (!ingredient) {
        throw new Error('not found')
    }

    return await ingredient.update(payload)
}

export const getById = async (id: number): Promise<TransactionAttributes | null> => {
    return await Transaction.findByPk(id);
}

export const deleteById = async (id: number): Promise<boolean> => {
    const deletedCount = await Transaction.destroy({ where: { id } });
    return !!deletedCount
}

export const getAll = async (from: string = '', to: string = ''): Promise<TransactionAttributes[]> => {
    let query: Query = {};
    if(from && to) {
        query.where = {
            createdAt: {
                [Op.between]: [from, to]
            }
        };
    }
    return await Transaction.findAll(query);
}

export const getUserTransactions = async (accountId: number, from: string = '', to: string = ''): Promise<TransactionAttributes[]> => {
    let query: Query = {};

    query.where = {
        AccountId: accountId,
    };

    if(from && to) {
        query.where.createdAt = {
            [Op.between]: [from, to]
        };
    }

    return await Transaction.findAll(query);
}