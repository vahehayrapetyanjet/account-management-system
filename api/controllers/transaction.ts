import {  Request, Response} from 'express'
import * as transactionService from '../../db/services/transaction'
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

export const deleteAccount = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    try {
        const result = await transactionService.deleteById(id);
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
    const isValid = transactionService.validate(accountData);
    if(!isValid) {
        return errorResponse(res, [HTTP_ERRORS.VALIDATION_FAILED], 400);
    }
    try {
        const result = await transactionService.update(id, accountData);
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
    const isValid = transactionService.validate(accountData);
    if(!isValid) {
        return errorResponse(res, [HTTP_ERRORS.VALIDATION_FAILED], 400);
    }
    try {
        const result = await transactionService.create(accountData);
        if(!result) {
            return errorResponse(res, [HTTP_ERRORS.INTERNAL_SERVER_ERROR], 500);
        }
        return res.status(200).json(result);
    } catch(e) {
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