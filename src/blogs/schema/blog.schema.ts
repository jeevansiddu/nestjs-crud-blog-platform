import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BlogDocument = Blog & Document;

@Schema()
export class Blog {
  @Prop()
  title: string;

  @Prop()
  userId: Number;

  @Prop()
  content: string;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;

  @Prop()
  comments: string;
}

export const BlogSchema = SchemaFactory.createForClass(Blog);
