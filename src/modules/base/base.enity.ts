import { Exclude } from 'class-transformer'
import { DataTypes } from 'sequelize'
import {
    Column,
    CreatedAt,
    Default,
    Model,
    UpdatedAt,
} from 'sequelize-typescript'

export abstract class BaseModel<T> extends Model<T> {
    @Exclude()
    @Default(1)
    @Column({ type: DataTypes.INTEGER, field: 'CreatedBy' })
    createdBy: number

    @CreatedAt
    @Column({ field: 'CreatedDate' })
    createdDate: Date

    @Exclude()
    @Column({ type: DataTypes.INTEGER, field: 'updateBy' })
    updatedBy: number

    @UpdatedAt
    @Column({ field: 'UpdatedDate' })
    updatedDate: Date
}
