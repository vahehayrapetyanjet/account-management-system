import { Router } from 'express'

import * as controller from '../controllers/account'

const ingredientsRouter = Router()

ingredientsRouter.get('/:id', controller.get)
ingredientsRouter.put('/:id', controller.update)
ingredientsRouter.delete('/:id', controller.get)
ingredientsRouter.post('/', controller.create);
ingredientsRouter.get('/', controller.getAll);

export default ingredientsRouter