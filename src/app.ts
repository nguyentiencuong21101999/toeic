import cors from 'cors'
import paypal from 'paypal-rest-sdk'
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
paypal.configure({
    mode: 'sandbox', //sandbox or live
    client_id:
        'AYB1Kr9dLp9xlOhQpythu7K0xxJkfD35ewgUcLqMmgmgSS9qlTv2TxMPuIjUcx_9xOeRFr3Owwz2JG5H',
    client_secret:
        'EH5SIeAKRh5Nq4VOJK6IxeulHLjK5SwYCoMbszZ9PhZo2QNI3jLsFqluhq2GRUpv2vdlEKooZGmJ8NLL',
})

app.post('/payment', async (req, res) => {
    const create_payment_json = {
        intent: 'sale',
        payer: {
            payment_method: 'paypal',
        },
        redirect_urls: {
            return_url: 'http://localhost:4000/success',
            cancel_url: 'http://youtube.com',
        },
        transactions: [
            {
                item_list: {
                    items: [
                        {
                            name: 'book',
                            sku: 'book',
                            price: '1.00',
                            currency: 'USD',
                            quantity: 1,
                        },
                    ],
                },
                amount: {
                    currency: 'USD',
                    total: '1.00',
                },
                description: 'payment test.',
            },
        ],
    }
    paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            throw error
        } else {
            console.log('Create Payment Response')
            res.json(payment)
        }
    })
})

app.get('/success', (req, res) => {
    console.log(req.query)
    const payerId = req.query.PayerID
    const paymentId = req.query.paymentId

    const execute_payment_json = {
        payer_id: payerId,
        transactions: [
            {
                amount: {
                    currency: 'USD',
                    total: '1.00',
                },
            },
        ],
    }

    paypal.payment.execute(
        paymentId,
        execute_payment_json,
        function (error, payment) {
            if (error) {
                res.send(error)
            } else {
                res.json(payment)
            }
        }
    )
})
app.use('/users', userRouter)

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log('========', err)
    handleError(err, res)
})

app.listen(port, async () => {
    await database.authenticate()
    await redisService.connect()
    // await database.sync({ alter: true })
    return logger.info(`Server is listening at port ${port}`)
})
