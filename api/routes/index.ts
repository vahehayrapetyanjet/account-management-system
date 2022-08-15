

import { Router } from 'express'
import accountRouter from './account'
import personRouter from './person'
import transactionRouter from './transaction'

const router = Router()

router.use('/account', accountRouter)
router.use('/person', personRouter)
router.use('/transaction', transactionRouter)

export default router