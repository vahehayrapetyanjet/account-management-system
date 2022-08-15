import Ajv from 'ajv'
import { Account } from '../models'
import { AccountInput, AccountTypes } from '../models/Account'

const ajv = new Ajv()
const schema = {
  type: 'object',
  properties: {
    balance: { type: 'integer' },
    delayWithDrawalLimit: { type: 'integer' },
    activeFlag: { type: 'boolean' },
    type: { enum: [AccountTypes.User] },
    PersonId: { type: 'integer' },
  },
  required: ['activeFlag', 'type', 'PersonId'],
  additionalProperties: false
}

const validateSchema = ajv.compile(schema)

export const validate = (payload: AccountInput) => {
    return validateSchema(payload);
}
export const create = async (payload: AccountInput): Promise<Account> => {
    return Account.create(payload)
}

export const update = async (id: number, payload: Partial<AccountInput>): Promise<Account>  => {
    const ingredient = await Account.findByPk(id)

    if (!ingredient) {
        throw new Error('not found')
    }

    return await ingredient.update(payload)
}

export const getById = async (id: number): Promise<Account | null> => {
    return await Account.findByPk(id);
}

export const deleteById = async (id: number): Promise<boolean> => {
    const deletedCount = await Account.destroy({ where: { id } });
    return !!deletedCount
}

export const getAll = (): Promise<Account[]> => {
    return Account.findAll();
}