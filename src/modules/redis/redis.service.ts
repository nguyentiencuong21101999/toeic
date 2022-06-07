import { RedisClientType } from '@node-redis/client'
import { createClient } from 'redis'
import { Config, configs } from '../../configs'
import { logger } from '../../helpers/logger'

const WD_ACCESS_TOKEN_KEY = 'wd_access_token'

export class RedisService {
    conf: Config
    client: RedisClientType

    constructor(conf: Config) {
        this.conf = conf
        this.client = createClient({ url: this.conf.redisURI })
    }

    async connect() {
        await this.client.connect()
        logger.info('Redis connect successful!')
    }

    async getTokens(userId: number) {
        const res = await this.client.hGet(
            WD_ACCESS_TOKEN_KEY,
            userId.toString()
        )
        if (res != null) {
            return new Set(res.split(','))
        }
        return new Set()
    }

    async setToken(userId: number, token: string) {
        await this.client.hSet(WD_ACCESS_TOKEN_KEY, userId.toString(), token)
    }

    async addToken(userId: number, token: string) {
        const tokens = await this.getTokens(userId)
        tokens.add(token)
        await this.setToken(userId, [...token].join(','))
    }

    async removeToken(userId: number, token: string) {
        const tokens = await this.getTokens(userId)
        tokens.delete(token)
        await this.setToken(userId, [...token].join(','))
    }
}

export const redisService = new RedisService(configs)

redisService.client.on('error', (err) =>
    logger.error('Redis Client Error', err)
)
