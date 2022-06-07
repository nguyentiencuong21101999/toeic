import bcrypt from 'bcrypt'
import { database } from '../../database/connection'
import { Errors } from '../../helpers/error'
import { genFullName } from '../../helpers/utils'
import { ColossalUserService } from '../colossal-users/colossal-user.service'
import { CreateUserDTO } from './dtos/user-create.dto'
import UserDevice from './models/user-device.model'
import { User } from './models/user.model'
import { SignInDTO, UserDTO } from './dtos/user.dto'
import { UserDeviceDTO } from './dtos/user-device.dto'

export class UserService {
    colossalUserService: ColossalUserService

    constructor(colossalUserService: ColossalUserService) {
        this.colossalUserService = colossalUserService
    }

    async signUp(params: CreateUserDTO) {
        // validate user info
        await this.validateUserRegistrationInfo(params)
        let newUserId: number
        await database.transaction(async (transaction) => {
            // create wolfden user
            params.fullName = genFullName(
                params.firstName,
                params.middleName,
                params.lastName
            )
            params.password = await bcrypt.hash(params.password, 10)
            const user = await User.create(params, { transaction })

            newUserId = user.userId
        })

        const user = await User.findOne({ where: { userId: newUserId } })
        const res = UserDTO.fromUser(user)

        if (params.tokenFireBase != null) {
            const record = CreateUserDTO.toUserDevice(params)
            record.createdBy = newUserId
            record.userId = newUserId
            await this.createUserDevice(record)
        }
        return res
    }

    async signIn(params: SignInDTO) {
        const user = await User.findOne({
            where: { userName: params.username },
        })

        if (user == null) {
            throw Errors.UserNotFound
        }
        const isValidPassword = bcrypt.compareSync(
            params.password,
            user.password
        )
        if (!isValidPassword) {
            throw Errors.InvalidPassword
        }

        if (params.tokenFireBase != null) {
            const record = SignInDTO.toUserDevice(params)
            record.createdBy = user.userId
            record.userId = user.userId
            await this.createUserDevice(record)
        }
        const res = UserDTO.fromUser(user)
        return res
    }

    private async validateUserRegistrationInfo(params: CreateUserDTO) {
        const existedUsername = await User.findOne({
            where: { userName: params.userName },
        })
        if (existedUsername) {
            throw Errors.AlreadyHaveWolfdenAccount
        }

        const existedEmail = await User.findOne({
            where: { email: params.email },
        })
        if (existedEmail) {
            throw Errors.ExistedEmail
        }

        const existedPhoneNumber = await User.findOne({
            where: { phoneNumber: params.phoneNumber },
        })
        if (existedPhoneNumber) {
            throw Errors.ExistedPhoneNumber
        }
    }
    createUserDevice = async (params: UserDeviceDTO) => {
        params.tokenFireBase = params.tokenFireBase ?? null
        //check existed userDevice
        const userDevice = await UserDevice.findOne({
            where: {
                userId: params.userId,
                tokenFireBase: params.tokenFireBase,
            },
        })

        if (userDevice) {
            await UserDevice.update(params, {
                where: {
                    userId: params.userId,
                    tokenFireBase: params.tokenFireBase,
                },
            })
        } else {
            await UserDevice.create(params)
        }
    }
}
