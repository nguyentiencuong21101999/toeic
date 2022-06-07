import { generate } from 'generate-password'
import { encrypt } from '../../helpers/crypto'
import { CreateUserDTO } from '../users/dtos/user.dto'

export interface ColossalLoginDTO {
    uid: string
    pwd: string
    uip: string
}

export class CreateColossalUserDTO {
    userId: string
    password: string
    givenName: string
    familyName: string
    dob: string
    contactNumber: string
    email: string
    unitNumber: string
    streetNumber: string
    streetType: string
    streetName: string
    suburb: string
    postcode: string
    state: string
    postalAddress: string
    userIP: string
    precommitAmount: number
    precommitPeriod: number
    gender: string
    middleName: string

    static fromCreateUserDTO(user: CreateUserDTO): CreateColossalUserDTO {
        const dto = new CreateColossalUserDTO()
        dto.givenName = user.firstName
        dto.familyName = user.lastName
        dto.dob = user.dob
        dto.contactNumber = user.phoneNumber
        dto.email = user.email
        dto.postalAddress = user.residentialAddress
        dto.userIP = user.userIp
        dto.precommitAmount = user.depositLimitValue
        dto.precommitPeriod = user.depositLimitPeriodInHour
        dto.gender = user.title
        dto.middleName = user.middleName
        dto.userId = user.username + '_wolfden_' + Date.now()
        dto.state = user.state
        dto.streetNumber = user.streetNumber
        dto.streetName = user.streetName
        dto.streetType = user.streetType
        dto.suburb = user.suburb
        dto.postcode = user.postcode
        dto.middleName = ''
        dto.password = encrypt(
            generate({
                length: 10,
                numbers: true,
            })
        )
        return dto
    }
}

export interface ColossalError {
    erl: number
    erd: string
}

export interface ColossalErrorRes {
    err: ColossalError
    uv: boolean
}

export interface KYCError {
    code: string
    message: string
    userToken: string
    isLoggedIn: boolean
    verificationRecorded: boolean
}

export interface KYCErrorRes {
    error: KYCError
}
