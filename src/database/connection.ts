import { plainToInstance } from 'class-transformer'
import humps from 'humps'
import path from 'path/posix'
import { QueryTypes, Transactionable } from 'sequelize'
import { Sequelize } from 'sequelize-typescript'
import { configs } from '../configs'
import { logger } from '../helpers/logger'
import { UserAdvance } from '../modules/users/models/user-advance.model'
import UserDevice from '../modules/users/models/user-device.model'
import { User } from '../modules/users/models/user.model'

export const database = new Sequelize(configs.dbURI, {
    dialect: 'mysql',
    logging: (msg) => logger.info(msg),
    models: [User, UserAdvance, UserDevice],
})
export interface CustomQueryOptions extends Transactionable {
    replacements?: unknown[]
    plain?: boolean
}

/** Execute store procedure */
export const execProc = async <T extends object>(
    Model: any,
    procName: string,
    opts: CustomQueryOptions
): Promise<T> => {
    const params = opts.replacements || []
    const qs: string[] = []
    for (let i = 0; i < params.length; i++) {
        qs.push('?')
    }
    const [res] = await database.query(`CALL ${procName}(${qs.join(',')})`, {
        replacements: params,
        type: QueryTypes.SELECT,
        transaction: opts.transaction,
    })
    const obj: any[] = []
    for (const i in res) {
        obj.push(res[i])
    }
    if (opts.plain) {
        logger.info(JSON.stringify(obj[0]))
        return plainToInstance(Model, humps.camelizeKeys(obj[0]), {
            excludeExtraneousValues: true,
        }) as T
    }
    logger.info(JSON.stringify(obj))
    return plainToInstance(Model, humps.camelizeKeys(obj), {
        excludeExtraneousValues: true,
    }) as T
}
