import {
    Table,
    Column,
    Model,
    DataType,
    ForeignKey,
    BelongsTo
} from 'sequelize-typescript';
import { User } from './userModel';

@Table
export class Task extends Model {
    @Column(DataType.STRING)
    title!: string;

    @Column(DataType.STRING)
    description!: string;

    @Column({ type: DataType.BOOLEAN, defaultValue: false })
    done!: boolean;

    @ForeignKey(() => User)
    @Column
    userId!: number;

    @BelongsTo(() => User)
    user!: User;
}
  