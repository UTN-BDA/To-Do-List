//Modelo de Usuario
import { Table, Column, Model, DataType } from "sequelize-typescript";

@Table({
    tableName: 'users'})

export class User extends Model{
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
    declare id: number;

    @Column({
        type: DataType.STRING(100)
    })
    declare username: string;

    @Column({
        type: DataType.STRING(100)
    })
    declare password: string;
    
    @Column({
        type: DataType.STRING(100)
    })
    declare role: string;


}

