import Ajv from 'ajv'
import { Op } from 'sequelize'
import addFormats from 'ajv-formats'
import { Transaction } from '../models'
import { TransactionInput } from '../models/Transaction'

const ajv = new Ajv();
addFormats(ajv);

const schema = {
  type: 'object',
  properties: {
    value: { type: 'number' },
    AccountId: {type: 'number'},
    transactionDate:  { type: 'string', format: 'date-time' },
  },
  required: ['value', 'transactionDate', 'AccountId'],
  additionalProperties: false
}
export interface Query {
    where?: {
        createdAt?: {
            [Op.between]?: string[]
            [Op.gt]?: string
            [Op.lt]?: string
        },
        AccountId?: number
    }
}

const validateSchema = ajv.compile(schema)

export const validate = (payload: TransactionInput) => {
    return validateSchema(payload);
}
export const create = async (payload: TransactionInput): Promise<Transaction> => {
    return Transaction.create(payload)
}

export const update = async (id: number, payload: Partial<TransactionInput>): Promise<Transaction>  => {
    const ingredient = await Transaction.findByPk(id)

    if (!ingredient) {
        throw new Error('not found')
    }

    return await ingredient.update(payload)
}

export const getById = async (id: number): Promise<Transaction | null> => {
    return await Transaction.findByPk(id);
}

export const deleteById = async (id: number): Promise<boolean> => {
    const deletedCount = await Transaction.destroy({ where: { id } });
    return !!deletedCount
}

export const getAll = async (from = '', to = ''): Promise<Transaction[]> => {
    const query: Query = {};
    if(from && to) {
        query.where = {
            createdAt: {
                [Op.between]: [from, to]
            }
        };
    } else if (from) {
        query.where  = {
            createdAt: {
                [Op.gt]: from
            }
        };
    } else if (to) {
        query.where  = {
            createdAt: {
                [Op.lt]: to
            }
        };
    }

    return await Transaction.findAll(query);
}

export const getUserTransactions = async (accountId: number, from = '', to = ''): Promise<Transaction[]> => {
    const query: Query = {};

    query.where = {
        AccountId: accountId,
    };

    if(from && to) {
        query.where.createdAt = {
            [Op.between]: [from, to]
        };
    } else if (from) {
        query.where.createdAt = {
            [Op.gt]: from
        };
    } else if (to) {
        query.where.createdAt = {
            [Op.lt]: to
        };
    }

    return await Transaction.findAll(query);
}