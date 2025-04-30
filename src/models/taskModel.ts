import { Table, Column, Model, DataType } from "sequelize-typescript";

@Table({
    tableName: 'tasks'})

export class Task extends Model{
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
    declare id: number;

    @Column({
        type: DataType.STRING(100)
    })
    declare title: string;

    @Column({
        type: DataType.STRING(100)
    })
    declare description: string;

    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false
    })
    declare done: boolean;
}

