import { ApiProperty } from '@nestjs/swagger';
import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { Order } from 'src/orders/order.model';

interface Adress {
  country: string;
  city: string;
  street: string;
  building?: number;
  apartament?: number;
}

interface UserCreationAttr {
  login: string;
  adress: Adress;
  phone: number;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttr> {
  @ApiProperty({ example: '1', description: 'unique identifier' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  userId: number;

  @ApiProperty({ example: 'login', description: `user's login` })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  login: string;

  @ApiProperty({ example: `Russian Federation`, description: `user's adress` })
  @Column({
    type: DataType.JSONB,
    allowNull: false,
  })
  adress: Adress;

  @ApiProperty({ example: `89998887766`, description: `user's phone number` })
  @Column({
    type: DataType.STRING,
    unique: true,
    defaultValue: false,
  })
  phoneNumber: string;

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
