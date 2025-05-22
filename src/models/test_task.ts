import { Table, Column, Model, DataType, AllowNull, PrimaryKey, AutoIncrement } from 'sequelize-typescript';

@Table({
    tableName: 'test_tasks',
    timestamps: false,  // si no usás createdAt, updatedAt
})
export class TestTask extends Model<TestTask> {

    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    declare id: number;

    @AllowNull(false)
    @Column(DataType.STRING(255))
    declare title: string;

    @AllowNull(true)
    @Column(DataType.TEXT)
    declare description?: string;

    @AllowNull(false)
    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false,
    })
    declare status: boolean;

    @AllowNull(true)
    @Column(DataType.INTEGER)
    declare userId?: number;
}
