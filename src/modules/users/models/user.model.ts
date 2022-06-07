import { Exclude } from 'class-transformer'
import { DataTypes } from 'sequelize'
import {
    AllowNull,
    Column,
    Default,
    DeletedAt,
    Index,
    Table,
} from 'sequelize-typescript'
import { BaseModel } from '../../base/base.enity'

@Table({ tableName: 'User', paranoid: true })
export class User extends BaseModel<User> {
    @Column({ field: 'UserId', autoIncrement: true, primaryKey: true })
    userId: number

    @Index
    @Column({ type: DataTypes.STRING(32), field: 'UserName' })
    userName: string

    @Exclude()
    @AllowNull
    @Column({ type: DataTypes.STRING(255), field: 'Pass' })
    password: string

    @Column({ type: DataTypes.STRING(5), field: 'Title' })
    title: string

    @Column({ type: DataTypes.STRING(32), field: 'FirstName' })
    firstName: string

    @Default('')
    @Column({ type: DataTypes.STRING(32), field: 'MiddleName' })
    middleName: string

    @Column({ type: DataTypes.STRING(32), field: 'LastName' })
    lastName: string

    @Column({ type: DataTypes.STRING(128), field: 'FullName' })
    fullName: string

    @Index
    @Column({
        type: DataTypes.STRING(64),
        field: 'Email',
    })
    email: string

    @AllowNull
    @Column({ type: DataTypes.DATEONLY, field: 'DOB' })
    dob: string

    @Index
    @Column({
        type: DataTypes.STRING(16),
        field: 'PhoneNumber',
    })
    phoneNumber: string

    @AllowNull
    @Column({ type: DataTypes.STRING(32), field: 'RefUserId' })
    refUserId: string

    @AllowNull
    @Column({
        type: DataTypes.STRING(128),
        field: 'ProfileUrl',
    })
    profileUrl: string

    @DeletedAt
    @Column({ field: 'DeletedDate' })
    deletedDate: Date

    // @Default(0)
    // @Column({ type: DataTypes.BOOLEAN, field: 'IsPrivateAccount' })
    // isPrivateAccount: boolean

    // @Default(0)
    // @Column({ type: DataTypes.BOOLEAN, field: 'IsWolfdenAccount' })
    // isWolfdenAccount: boolean

    // @Default(1)
    // @Column({ type: DataTypes.BOOLEAN, field: 'IsTurnOnCopyBet' })
    // isTurnOnCopyBet: boolean

    // @Default(0)
    // @Column({ type: DataTypes.BOOLEAN, field: 'IsDepositLimit' })
    // isDepositLimit: boolean

    // @Default(0)
    // @Column({ type: DataTypes.DECIMAL(15, 2), field: 'DepositLimitValue' })
    // depositLimitValue: number

    // @Default(1)
    // @Column({
    //     type: DataTypes.DECIMAL(6, 1),
    //     field: 'DepositLimitPeriodInHour',
    // })
    // depositLimitPeriodInHour: number

    // @Default(0)
    // @Column({ type: DataTypes.BOOLEAN, field: 'IsAuthenticProfile' })
    // isAuthenticProfile: boolean

    // @Column({
    //     type: DataTypes.DATE,
    //     field: 'AuthenticProfileDate',
    // })
    // authenticProfileDate: string

    // @Default(1)
    // @Column({ type: DataTypes.BOOLEAN, field: 'IsActive' })
    // isActive: boolean
}
