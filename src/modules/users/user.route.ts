import express from 'express'
import { configs } from '../../configs'
import { AuthService } from '../auth/auth.service'
import { ColossalUserService } from '../colossal-users/colossal-user.service'
import { redisService } from '../redis/redis.service'
import { UserController } from './user.controller'
import { UserMiddleWare } from './user.middleware'
import { UserService } from './user.service'

const colossalUserService = new ColossalUserService(configs)
const authService = new AuthService(configs, redisService)
const userService = new UserService(colossalUserService)

const userController = new UserController(authService, userService)
const userMiddleware = new UserMiddleWare()

export const userRouter = express.Router()

userRouter.post(
    '/sign-up',
    userMiddleware.tranformAndValidateCreateUserReq,
    userController.signUp
)

userRouter.post('/sign-in', userController.signIn)
