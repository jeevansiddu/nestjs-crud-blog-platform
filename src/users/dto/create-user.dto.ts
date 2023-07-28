import { IsDate, IsNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;
  @IsNumber()
  id: number;
  @IsString()
  email: string;
  @IsString()
  password: string;
  @IsDate()
  createdAt: Date;
  @IsDate()
  updatedAt: Date;
}
