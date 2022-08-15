import Ajv from 'ajv'
import addFormats from 'ajv-formats'
import { Person } from '../models'
import { PersonInput } from '../models/Person'

const ajv = new Ajv();
addFormats(ajv)

const schema = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    document: { type: 'string'},
    birthDate: { type: 'string', format: 'date' },
  },
  required: ['name'],
  additionalProperties: false
};

const validateSchema = ajv.compile(schema)

export const validate = (payload: PersonInput) => {
    return validateSchema(payload);
}
export const create = async (payload: PersonInput): Promise<Person> => {
    return Person.create(payload)
}

export const update = async (id: number, payload: Partial<PersonInput>): Promise<Person>  => {
    const ingredient = await Person.findByPk(id)

    if (!ingredient) {
        throw new Error('not found')
    }

    return await ingredient.update(payload)
}

export const getById = async (id: number): Promise<Person | null> => {
    return await Person.findByPk(id);
}

export const deleteById = async (id: number): Promise<boolean> => {
    const deletedCount = await Person.destroy({ where: { id } });
    return !!deletedCount
}

export const getAll = (): Promise<Person[]> => {
    return Person.findAll();
}