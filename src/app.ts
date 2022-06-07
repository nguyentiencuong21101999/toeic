import cors from 'cors'
import express, { NextFunction, Request, Response } from 'express'
import { IncomingHttpHeaders } from 'http'
import humps from 'humps'
import { configs, isProduction } from './configs'
import { database } from './database/connection'
import { handleError } from './helpers/error'
import { logger } from './helpers/logger'
import { redisService } from './modules/redis/redis.service'
import { userRouter } from './modules/users/user.route'

const app = express()
const port = configs.port
const avoidHumpsPaths = new Set()

app.use(cors())
app.use(express.json())

// camelize keys
app.use((req, res, next) => {
    if (!avoidHumpsPaths.has(req.path)) {
        req.headers = humps.camelizeKeys(req.headers) as IncomingHttpHeaders
        req.body = humps.camelizeKeys(req.body)
        req.query = humps.camelizeKeys(req.query) as qs.ParsedQs
    }
    next()
})

app.get('/healthcheck', async (req, res) => {
    res.send({ status: 'healthy' })
})

app.use('/users', userRouter)

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log('========', err)
    handleError(err, res)
})

app.listen(port, async () => {
    await redisService.connect()
    await database.sync({ alter: true })
    return logger.info(`Server is listening at port ${port}`)
})
