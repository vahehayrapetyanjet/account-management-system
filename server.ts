import express, { Request, Response} from  'express'
import bodyParser from  'body-parser'

// Custom modules
import { env  } from './config/env'
import dbInit from './db/init'
import routes from './api/routes'


dbInit()

const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// app routes
app.use('/api/v1', routes)

app.listen(env.PORT, () => {
    console.log(`Example app listening on port ${env.PORT} node env ${env.NODE_ENV}`)
})
