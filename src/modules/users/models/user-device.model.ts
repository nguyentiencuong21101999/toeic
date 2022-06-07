import { DataTypes } from 'sequelize'
import {
    AllowNull,
    AutoIncrement,
    Column,
    PrimaryKey,
    Table,
} from 'sequelize-typescript'
import { BaseModel } from '../../base/base.enity'
@Table({
    tableName: 'UserDevice',
})
export default class UserDevice extends BaseModel<UserDevice> {
    @PrimaryKey
    @AutoIncrement
    @Column({ field: 'UserDeviceId', type: DataTypes.INTEGER({ length: 11 }) })
    userDeviceId: number

    @Column({ field: 'TokenFireBase', type: DataTypes.STRING({ length: 255 }) })
    tokenFireBase: string

    @AllowNull(false)
    @Column({ field: 'UserId', type: DataTypes.INTEGER({ length: 11 }) })
    userId: number
}
