import { Expose, plainToInstance } from 'class-transformer'

import { User } from '../models/user.model'
import { UserDeviceDTO } from './user-device.dto'

export class SignInDTO {
    username: string
    password: string
    tokenFireBase: string

    static toUserDevice = (dto: SignInDTO): UserDeviceDTO => {
        return plainToInstance(UserDeviceDTO, dto)
    }
}

export class UserDTO {
    @Expose()
    userId: number
    @Expose()
    title: string
    @Expose()
    firstName: string
    @Expose()
    middleName: string
    @Expose()
    lastName: string
    @Expose()
    dob: string
    @Expose()
    fullname: string
    @Expose()
    phoneNumber: string
    @Expose()
    email: string
    @Expose()
    @Expose()
    userName: string
    @Expose()
    profileUrl: string
    @Expose()
    accessToken: string

    static fromUser(user: User): UserDTO {
        return plainToInstance(UserDTO, user.get(), {
            excludeExtraneousValues: true,
        })
    }
}
