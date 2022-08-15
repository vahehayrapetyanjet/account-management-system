import {  Request, Response} from 'express'
import sequelize from  '../../db/config'
import * as personService from '../../db/services/person'
import * as accountService from '../../db/services/account'
import { errorResponse } from '../../utils/http'
import { HTTP_ERRORS, ACCOUNT_DEFAULT } from '../../config/constants';

export const get = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const result = await personService.getById(id);
    if(result) {
        return res.status(200).json(result);
    }
    return res.status(404);
};

export const deleteAccount = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    try {
        const result = await personService.deleteById(id);
        if(result) {
            return res.status(200).json(result);
        }
        return errorResponse(res, [HTTP_ERRORS.USER_NOT_FOUND], 404);
    } catch(e) {
        return errorResponse(res, [HTTP_ERRORS.INTERNAL_SERVER_ERROR], 500);
    }
};


export const update = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const accountData = req.body;
    const isValid = personService.validate(accountData);
    if(!isValid) {
        return errorResponse(res, [HTTP_ERRORS.VALIDATION_FAILED], 400);
    }
    try {
        const result = await personService.update(id, accountData);
        if(result) {
            return res.status(200).json(result);
        }
        return errorResponse(res, [HTTP_ERRORS.USER_NOT_FOUND], 404);
    } catch(e) {
        return errorResponse(res, [HTTP_ERRORS.INTERNAL_SERVER_ERROR], 500);
    }
};


export const create = async (req: Request, res: Response) => {
    const accountData = req.body;
    const isValid = personService.validate(accountData);
    if(!isValid) {
        return errorResponse(res, [HTTP_ERRORS.VALIDATION_FAILED], 400);
    }
    const transaction = await sequelize.transaction();
    try {
        const personCreationResult = await personService.create(accountData);
        if(!personCreationResult) {
            transaction.rollback();
            return errorResponse(res, [HTTP_ERRORS.INTERNAL_SERVER_ERROR], 500);
        }
        const accountCreationResult = await accountService.create({
            PersonId: personCreationResult.getDataValue('id') ,
            balance: ACCOUNT_DEFAULT.BALANCE,
            type: ACCOUNT_DEFAULT.TYPE,
            activeFlag: ACCOUNT_DEFAULT.ACTIVE,
            delayWithDrawalLimit: ACCOUNT_DEFAULT.DELAY_WITH_DRAWAL_LIMIT
        });
        if(!accountCreationResult) {
            transaction.rollback();
            return errorResponse(res, [HTTP_ERRORS.INTERNAL_SERVER_ERROR], 500);
        }
        await transaction.commit();
        return res.status(200).json(personCreationResult);
    } catch(e) {
        transaction.rollback();
        return errorResponse(res, [HTTP_ERRORS.INTERNAL_SERVER_ERROR], 500);
    }
};

export const getAll = async (req: Request, res: Response) => {
    const result = await personService.getAll();
    return res.status(200).json(result);
};