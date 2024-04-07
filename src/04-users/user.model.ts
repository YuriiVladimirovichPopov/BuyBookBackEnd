import { ApiProperty } from '@nestjs/swagger';
import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { Order } from 'src/03-orders/order.model';

@Table({ tableName: 'users' })
export class User extends Model<User> {
  @ApiProperty({ example: '1', description: 'unique identifier' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'login', description: `user's login` })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  login: string;

  @ApiProperty({ example: `89998887766`, description: `user's phone number` })
  @Column({
    type: DataType.STRING,
  })
  phoneNumber: string;

  @ApiProperty({ example: `address`, description: `user's address` })
  @Column({
    type: DataType.STRING,
  })
  address: string;

  @ApiProperty({ example: 'true', description: 'ban or unban' })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  banned: boolean;

  @ApiProperty({ example: 'swear at the operator', description: 'ban reason' })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  banReason: string;

  @HasMany(() => Order)
  orders: Order[];
}
