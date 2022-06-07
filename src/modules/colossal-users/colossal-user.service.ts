import axios from 'axios'
import { createHmac } from 'crypto'
import utf8 from 'utf8'
import { Config } from '../../configs'
import { Errors } from '../../helpers/error'
import { logger } from '../../helpers/logger'
import {
    ColossalErrorRes,
    ColossalLoginDTO,
    CreateColossalUserDTO,
    KYCErrorRes,
} from './colossal-user.dto'
import { ColossalUser } from './colossal-user.model'

export class ColossalUserService {
    conf: Config

    constructor(conf: Config) {
        this.conf = conf
    }

    getGenWebHeader(url: string) {
        const timestamp = Math.round(Date.now() / 1000)
        const secret = utf8.encode(this.conf.genwebSecretKey + timestamp)
        const signature = createHmac('sha1', secret)
            .update(utf8.encode(url))
            .digest('base64')
        const authorize = `clientKey=${this.conf.genwebClientKey}&timestamp=${timestamp}&signature=${signature}`
        return {
            Authorization: authorize,
            Charset: 'utf-8',
            'Content-Type': 'application/json',
        }
    }

    async login(data: ColossalLoginDTO) {
        const url = this.conf.genwebURL + '/GWBetService/r/u/Login'
        const res = await axios.post(url, data, {
            headers: this.getGenWebHeader(url),
        })
        const err = res.data as ColossalErrorRes
        if (err.err != null) {
            if (err.err.erl == 501) {
                // user not found
                return null
            }
            throw Errors.InternalServerError
        }
        return res.data as ColossalUser
    }

    async signup(data: CreateColossalUserDTO) {
        logger.info(JSON.stringify(data))
        try {
            await axios.post<ColossalUser>(
                this.conf.frankieURL + '/submit',
                data,
                {
                    headers: {
                        'X-Frankie-CustomerID': this.conf.frankieCusId,
                        api_key: this.conf.frankieApiKey,
                        'Content-Type': 'application/json',
                    },
                }
            )
            throw Errors.BadRequest
        } catch (err) {
            const errRes = err.response && err.response.data
            if (errRes != null) {
                const data = errRes as KYCErrorRes
                logger.info(JSON.stringify(data))
                const token = data.error && data.error.userToken
                if (token != null) {
                    return token
                }
            }
            throw err
        }
    }
}
