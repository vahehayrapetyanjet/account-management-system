import {  Request, Response} from 'express'
import sequelize from  '../../db/config'
import * as transactionService from '../../db/services/transaction'
import * as accountService from '../../db/services/account'
import { errorResponse } from '../../utils/http'
import { HTTP_ERRORS } from '../../config/constants';

export const get = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const result = await transactionService.getById(id);
    if(result) {
        return res.status(200).json(result);
    }
    return res.status(404);
};

export const create = async (req: Request, res: Response) => {
    const data = {
        ...req.body,
        transactionDate: new Date().toISOString()
    };
    const isValid = transactionService.validate(data);
    if(!isValid) {
        return errorResponse(res, [HTTP_ERRORS.VALIDATION_FAILED], 400);
    }
    const transaction = await sequelize.transaction();
    try {
        const account = await accountService.getById(data.AccountId);
        if(!account) {
            await transaction.rollback();
            return errorResponse(res, [HTTP_ERRORS.USER_NOT_FOUND], 404);
        }
        const result = await transactionService.create(data);
        if(!result) {
            await transaction.rollback();
            return errorResponse(res, [HTTP_ERRORS.INTERNAL_SERVER_ERROR], 500);
        }
        account?.setDataValue('balance', account?.getDataValue('balance') + data.value);
        account.save()
        await transaction.commit();
        return res.status(200).json(result);
    } catch(e) {
        await transaction.rollback();
        return errorResponse(res, [HTTP_ERRORS.INTERNAL_SERVER_ERROR], 500);
    }
};

export const getAll = async (req: Request, res: Response) => {
    const { from, to } = req.query;
    const result = await transactionService.getAll(from?.toString(), to?.toString());
    return res.status(200).json(result);
};

export const getUserTransactions = async (req: Request, res: Response) => {
    const accountId = Number(req.params.accountId);
    const { from, to } = req.query;
    const result = await transactionService.getUserTransactions(accountId, from?.toString(), to?.toString());
    return res.status(200).json(result);
};