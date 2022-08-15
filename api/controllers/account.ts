import {  Request, Response} from 'express'
import * as accountService from '../../db/services/account'
import { errorResponse } from '../../utils/http'
import { HTTP_ERRORS } from '../../config/constants';

export const get = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const result = await accountService.getById(id);
    if(result) {
        return res.status(200).json(result);
    }
    return errorResponse(res, [HTTP_ERRORS.RESOURCE_NOT_FOUND], 404);
};

export const deleteAccount = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    try {
        const result = await accountService.deleteById(id);
        if(result) {
            return res.status(200).json({ success: result });
        }
        return errorResponse(res, [HTTP_ERRORS.RESOURCE_NOT_FOUND], 404);
    } catch(e) {
        return errorResponse(res, [HTTP_ERRORS.INTERNAL_SERVER_ERROR], 500);
    }
};


export const update = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const accountData = req.body;
    const isValid = accountService.validate(accountData);
    if(!isValid) {
        return errorResponse(res, [HTTP_ERRORS.VALIDATION_FAILED], 400);
    }
    try {
        const result = await accountService.update(id, accountData);
        if(result) {
            return res.status(200).json(result);
        }
        return errorResponse(res, [HTTP_ERRORS.RESOURCE_NOT_FOUND], 404);
    } catch(e) {
        return errorResponse(res, [HTTP_ERRORS.INTERNAL_SERVER_ERROR], 500);
    }
};


export const create = async (req: Request, res: Response) => {
    const accountData = req.body;
    const isValid = accountService.validate(accountData);
    if(!isValid) {
        return errorResponse(res, [HTTP_ERRORS.VALIDATION_FAILED], 400);
    }
    try {
        const result = await accountService.create(accountData);
        if(!result) {
            return errorResponse(res, [HTTP_ERRORS.INTERNAL_SERVER_ERROR], 500);
        }
        return res.status(201).json(result);
    } catch(e) {
        return errorResponse(res, [HTTP_ERRORS.INTERNAL_SERVER_ERROR], 500);
    }
};

export const getAll = async (req: Request, res: Response) => {
    const result = await accountService.getAll();
    return res.status(200).json(result);
};