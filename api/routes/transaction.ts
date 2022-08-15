import { Router } from 'express'

import * as controller from '../controllers/transaction'

const ingredientsRouter = Router()

ingredientsRouter.get(':/id', controller.get)
ingredientsRouter.put('/:id', controller.update)
ingredientsRouter.delete('/:id', controller.get)
ingredientsRouter.post('/', controller.create);
ingredientsRouter.get('/', controller.getAll);
ingredientsRouter.get('/:accountId', controller.getUserTransactions);

export default ingredientsRouter