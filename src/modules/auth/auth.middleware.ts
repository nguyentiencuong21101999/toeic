import { NextFunction } from 'express'
import { Errors } from '../../helpers/error'
import { AuthService } from './auth.service'

export interface AuthRequest extends Request {
    userId: number
}

export class AuthMiddleWare {
    authService: AuthService

    constructor(authService: AuthService) {
        this.authService = authService
    }

    authorization = async (
        req: AuthRequest,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const authHeader = req.headers['authorization']
            const token = authHeader && authHeader.split(' ')[1]
            if (token == null) {
                return next(Errors.Unauthorized)
            }
            const payload = await this.authService.verifyToken(token)
            req.userId = payload.userId
            next()
        } catch (error) {
            next(Errors.Unauthorized)
        }
    }
}
