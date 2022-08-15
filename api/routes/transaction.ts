import { Router } from 'express'

import * as controller from '../controllers/transaction'

const ingredientsRouter = Router()

ingredientsRouter.get('/user/:accountId', controller.getUserTransactions);
ingredientsRouter.get('/:id', controller.get)
ingredientsRouter.post('/', controller.create);
ingredientsRouter.get('/', controller.getAll);

export default ingredientsRouter