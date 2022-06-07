import { Expose } from 'class-transformer'

export class UserDeviceDTO {
    @Expose()
    userId: number

    @Expose()
    createdBy: number

    @Expose()
    tokenFireBase: string
}
