import dotenv from 'dotenv'

dotenv.config()

const env = process.env

export interface Config {
    port: string
    dbURI: string
    redisURI: string
    secretKey: string
    frankieURL: string
    frankieApiKey: string
    frankieCusId: string
    genwebURL: string
    genwebClientKey: string
    genwebSecretKey: string
    awsS3Location: string
}

export const configs: Config = {
    port: env.PORT,
    dbURI: env.DB_URI,
    redisURI: env.REDIS_URI,
    secretKey: env.SECRET_KEY,
    frankieURL: env.FRANKIE_URL,
    frankieApiKey: env.FRANKIE_API_KEY,
    frankieCusId: env.FRANKIE_CUS_ID,
    genwebURL: env.GENWEB_URL,
    genwebClientKey: env.GENWEB_CLIENT_KEY,
    genwebSecretKey: env.GENWEB_SECRET_KEY,
    awsS3Location: env.AWS_S3_LOCATION,
}

export const isProduction = () => {
    return env.NODE_ENV == 'production'
}
