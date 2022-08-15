import { Response } from 'express'
import { SeverityTypes } from '../config/constants';

interface httpMessage  {
    severity: SeverityTypes,
    message: string
}

export const errorResponse = (res: Response, body: httpMessage[], status = 500) => {
    res.status(status).json(body)
};