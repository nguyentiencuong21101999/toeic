import { Expose, plainToInstance, Transform } from 'class-transformer'
import { IsEmail, IsNotEmpty, IsOptional, Matches } from 'class-validator'
import { Request } from 'express'
import { ToTrim } from '../../../helpers/utils'
import { UserDeviceDTO } from './user-device.dto'

export class CreateUserDTO {
    @Expose()
    @Matches(
        new RegExp(
            '^(?=[a-zA-Z0-9\\._-]{6,48})([a-zA-Z0-9]([._-]?[a-zA-Z0-9])*)$'
        )
    )
    userName: string

    @Expose()
    @Matches(new RegExp('^((?=.*[0-9])(?=.*[a-zA-Z]).{6,})$'))
    password: string
    @Expose()
    @Matches(
        new RegExp(
            '^(?:\\+?(61))? ?(?:\\((?=.*\\)))?(0?[2-57-8])\\)? ?(\\d\\d(?:[- ](?=\\d{3})|(?!\\d\\d[- ]?\\d[- ]))\\d\\d[- ]?\\d[- ]?\\d{3})$'
        )
    )
    phoneNumber: string

    @Expose()
    @IsEmail()
    email: string

    @Expose()
    @Transform(ToTrim)
    @Matches(new RegExp("^[a-zA-Z][a-zA-Z '-]*$"))
    firstName: string

    @Expose()
    @IsOptional()
    @Transform(ToTrim)
    @Matches(new RegExp("^[a-zA-Z][a-zA-Z '-]*$"))
    middleName: string

    @Expose()
    @Transform(ToTrim)
    @Matches(new RegExp("^[a-zA-Z][a-zA-Z '-]*$"))
    lastName: string

    @Expose()
    fullName: string

    @Expose()
    @IsOptional()
    @IsNotEmpty()
    tokenFireBase: string

    static fromReq = (req: Request): CreateUserDTO => {
        return plainToInstance(CreateUserDTO, req.body, {
            excludeExtraneousValues: true,
        })
    }
    static toUserDevice = (dto: CreateUserDTO): UserDeviceDTO => {
        return plainToInstance(UserDeviceDTO, dto)
    }
}
