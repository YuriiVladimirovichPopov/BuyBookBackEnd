import { ApiProperty } from '@nestjs/swagger';
import {
  Table,
  Column,
  Model,
  DataType,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { User } from '../../04-users/model/user.model';

@Table({ tableName: `user_address` })
export class UserAddress extends Model<UserAddress> {
  @ApiProperty({ example: '1', description: 'unique identifier' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Nebuvalia', description: `country` })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  country: string;

  @ApiProperty({ example: `PopaLend`, description: `city` })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  city: string;

  @ApiProperty({ example: `Mashinkina`, description: `street` })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  street: string;

  @ApiProperty({ example: '666', description: `building's number` })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  building: string;

  @ApiProperty({ example: '777', description: `apartment's number` })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  apartment: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;

  @BelongsTo(() => User)
  user: User;
}
