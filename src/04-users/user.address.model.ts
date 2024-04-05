import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'user_addresses' })
export class UserAddress extends Model<UserAddress> {
  @ApiProperty({ example: '1', description: 'unique identifier' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  addressId: number;

  @ApiProperty({ example: '1', description: `'user's country'` })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  country: string;

  @ApiProperty({ example: '1', description: `'user's city'` })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  city: string;

  @ApiProperty({ example: '1', description: `'user's street'` })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  street: string;

  @ApiProperty({ example: '1', description: `'user's building'` })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  building: number;

  @ApiProperty({ example: 'apartment', description: `'user's apartment'` })
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  apartment?: number;
}
