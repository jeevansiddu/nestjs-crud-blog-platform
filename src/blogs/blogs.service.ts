import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { Blog, BlogDocument } from './schema/blog.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class BlogsService {
  constructor(@InjectModel(Blog.name) private blogModel: Model<BlogDocument>) {}
  create(blog: CreateBlogDto) {
    // const createdUser = new this.userModel(createUserDto);
    // return createdUser.save();
    const createdBlog = new this.blogModel(blog);
    return createdBlog.save();
  }

  async findAll() {
    return await this.blogModel.find().exec();
  }

  async findOne(id: string) {
    return await this.blogModel.findOne({ title: id });
  }

  async update(title: string, id: Number, updateBlogDto: UpdateBlogDto) {
    const blog = await this.blogModel.findOne({ title: title });
    if (blog && blog.userId === id) {
      return await this.blogModel.findOneAndUpdate(
        { title: title },
        updateBlogDto,
      );
    }
    if (!blog) {
      return 'Blog not found';
    }
    console.log(blog);

    return 'Only person who posted the blog can update';
  }

  async remove(id: string) {
    const blog = await this.blogModel.findOneAndDelete({ title: id });

    if (!blog) {
      throw new NotFoundException(`Blog with title "${id}" not found.`);
    }
    return blog;
  }
}
