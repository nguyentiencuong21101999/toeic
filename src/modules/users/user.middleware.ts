import { validateOrReject } from 'class-validator'
import { NextFunction, Response } from 'express'
import { parseValidationError } from '../../helpers/validator'
import { BodyRequest } from '../base/base.request'
import { CreateUserDTO } from './dtos/user-create.dto'

export class UserMiddleWare {
    async tranformAndValidateCreateUserReq(
        req: BodyRequest<CreateUserDTO>,
        res: Response,
        next: NextFunction
    ) {
        try {
            req.body = CreateUserDTO.fromReq(req)
            await validateOrReject(req.body)
            next()
        } catch (err) {
            next(parseValidationError(err))
        }
    }
}
