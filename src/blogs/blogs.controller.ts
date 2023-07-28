import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
  UsePipes,
  NotFoundException,
  Query,
} from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { AuthService } from 'src/auth/auth.service';
import { LocalAuthGuard } from 'src/auth/local.auth.guard';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
// import { ValidationPipe } from 'src/pipe/class.validator.pipe';
import { ValidationPipe } from '@nestjs/common';

@Controller('blogs')
export class BlogsController {
  constructor(
    private blogsService: BlogsService,
    private authService: AuthService,
  ) {}
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Req() req) {
    return await this.authService.login(req.user._doc);
  }
  // @UsePipes()
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body(ValidationPipe) createBlogDto: CreateBlogDto, @Req() req) {
    const details = await this.blogsService.create(createBlogDto);
    return {
      success: true,
      message: 'blog Posted',
      data: details,
    };
    // return req.user;
  }

  @Get()
  async findAll() {
    const details = await this.blogsService.findAll();
    return {
      success: true,
      message: 'blog retrieved',
      data: details,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const details = await this.blogsService.findOne(id);
    if (!details) {
      throw new NotFoundException(`Blog with title "${id}" not found.`);
    }
    return {
      success: true,
      message: 'blog retrieved on id = ' + id,
      data: details,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  async update(
    @Query('title') title: string,
    @Query('id') id: string,
    @Body() updateBlogDto: UpdateBlogDto,
  ) {
    return await this.blogsService.update(title, +id, updateBlogDto);
    console.log('Title:', title); // Output: 'somename'
    console.log('Name:', id); // Output: 'somename'
  }
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const details = await this.blogsService.remove(id);
    if (!details) {
      throw new NotFoundException(`Blog with title "${id}" not found.`);
    }
    return {
      success: true,
      message: 'blog deleted on id = ' + id,
      data: details,
    };
  }
}
