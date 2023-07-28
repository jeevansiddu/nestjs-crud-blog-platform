import { Module } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { BlogsController } from './blogs.controller';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Blog, BlogSchema } from './schema/blog.schema';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/blog'),
    MongooseModule.forFeature([{ name: Blog.name, schema: BlogSchema }]),
  ],
  // imports: [],
  controllers: [BlogsController],
  providers: [BlogsService],
})
export class BlogsModule {}
