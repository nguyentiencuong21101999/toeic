import { DataTypes } from 'sequelize'
import { AllowNull, Column, Default, Table } from 'sequelize-typescript'
import { BaseModel } from '../../base/base.enity'
@Table({ tableName: 'UserAdvance' })
export class UserAdvance extends BaseModel<UserAdvance> {
    @Column({ field: 'UserId', primaryKey: true })
    userId: number

    @AllowNull
    @Column({ type: DataTypes.STRING(512), field: 'Motto' })
    motto: string

    @AllowNull
    @Column({ type: DataTypes.STRING(512), field: 'Bio' })
    bio: string

    @AllowNull
    @Column({ type: DataTypes.STRING(128), field: 'BannerUrl' })
    bannerURL: string

    @AllowNull
    @Default('AU')
    @Column({ type: DataTypes.STRING(5), field: 'CountryCode' })
    countryCode: string

    @Column({ type: DataTypes.STRING(256), field: 'ResidentialAddress' })
    residentialAddress: string

    @Column({ type: DataTypes.STRING(128), field: 'ColoUserName' })
    coloUserName: string

    @Column({ type: DataTypes.STRING(128), field: 'ColoPassword' })
    coloPassword: string

    @Column({ type: DataTypes.STRING(255), field: 'ColoToken' })
    coloToken: string

    @AllowNull
    @Column({ type: DataTypes.STRING(128), field: 'StateAddress' })
    state: string

    @AllowNull
    @Column({ type: DataTypes.STRING(10), field: 'StreetNumber' })
    streetNumber: string

    @AllowNull
    @Column({ type: DataTypes.STRING(128), field: 'StreetName' })
    streetName: string

    @AllowNull
    @Column({ type: DataTypes.STRING(10), field: 'StreetType' })
    streetType: string

    @AllowNull
    @Column({ type: DataTypes.STRING(128), field: 'SuburbAddress' })
    suburb: string

    @AllowNull
    @Column({ type: DataTypes.STRING(10), field: 'Postcode' })
    postcode: string

    @AllowNull
    @Column({ type: DataTypes.BIGINT, field: 'LastUserLoginTrackingId' })
    lastUserLoginTrackingId: string
}
