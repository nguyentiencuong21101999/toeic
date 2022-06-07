import { Expose, plainToInstance } from 'class-transformer'
import { Response } from 'express'
import { logger } from './logger'
import { ResponseWrapper } from './response.wrapper'

export class ErrorResp extends Error {
    @Expose()
    readonly status: number

    @Expose()
    readonly code: string

    @Expose()
    readonly message: string

    constructor(code: string, message: string, status?: number) {
        super()
        this.status = status
        this.code = code
        this.message = message
    }
}

export const Errors = {
    BadRequest: new ErrorResp('error.badRequest', 'Bad request', 400),
    Unauthorized: new ErrorResp('error.unauthorized', 'Unauthorized', 401),
    Forbidden: new ErrorResp('error.forbiden', 'Forbidden', 403),
    Sensitive: new ErrorResp(
        'error.sensitive',
        'An error occurred, please try again later.',
        400
    ),
    InternalServerError: new ErrorResp(
        'error.internalServerError',
        'Internal server error.',
        500
    ),
    AlreadyHaveColossalAccount: new ErrorResp(
        'error.alreadyHaveColossalAccount',
        'Already have colossal account.'
    ),
    AlreadyHaveWolfdenAccount: new ErrorResp(
        'error.alreadyHaveWolfdenAccount',
        'Already have wolfden account.'
    ),
    ExistedEmail: new ErrorResp('error.existedEmail', 'Email existed.'),
    ExistedPhoneNumber: new ErrorResp(
        'error.existedPhoneNumber',
        'Phone number existed.'
    ),
    UserNotFound: new ErrorResp('error.userNotFound', 'User not found.'),
    InvalidPassword: new ErrorResp(
        'error.invalidPassword',
        'Invalid password.'
    ),
}

export const handleError = (err: Error, res: Response) => {
    if (err instanceof ErrorResp) {
        const errResp = err as ErrorResp
        res.status(errResp.status || Errors.BadRequest.status).send(
            new ResponseWrapper(
                null,
                plainToInstance(ErrorResp, errResp, {
                    excludeExtraneousValues: true,
                })
            )
        )
    } else {
        logger.error(err)
        res.status(Errors.Sensitive.status).send(
            new ResponseWrapper(null, Errors.Sensitive)
        )
    }
}
