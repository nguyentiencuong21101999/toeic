import { instanceToPlain, plainToInstance } from 'class-transformer'
import jwt from 'jsonwebtoken'
import { Config } from '../../configs'
import { Errors } from '../../helpers/error'
import { RedisService } from '../redis/redis.service'

export class AuthPayload {
    userId: number
}
export class AuthService {
    conf: Config
    redis: RedisService

    constructor(conf: Config, redisService: RedisService) {
        this.conf = conf
        this.redis = redisService
    }

    signToken = async (userId: number) => {
        const sign = jwt.sign(userId.toString(), this.conf.secretKey)
        await this.redis.addToken(userId, sign)
        return sign
    }

    verifyToken = async (token: string) => {
        const decoded = jwt.verify(token, this.conf.secretKey, {
            complete: true,
        })
        const authPayload = plainToInstance(
            AuthPayload,
            instanceToPlain(decoded.payload)
        )
        const tokens = await this.redis.getTokens(authPayload.userId)
        if (!tokens.has(token)) {
            throw Errors.Unauthorized
        }
        return authPayload
    }
}
