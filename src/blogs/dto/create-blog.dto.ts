import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateBlogDto {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsNumber()
  userId: number;

  // @IsDate()
  // createdAt: Date;

  // @IsDate()
  // updatedAt: Date;

  @IsString()
  comments: string;
}
