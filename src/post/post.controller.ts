import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { CreatePostDto } from './post.dto/./create-post.dto'
import { UpdatePostDto } from './post.dto/update-post.dto'

@Controller('post')
export class PostController {
  posts: any[]

  constructor() {
    this.posts = [
      { id: 1, text: 'rest' },
      { id: 2, text: 'rest' },
      { id: 3, text: 'rest' }
    ]
  }

  @Get()
  async getAll() {
    return this.posts
  }

  @Post()
  async create(@Body() dto: CreatePostDto) {
    return [...this.posts, dto]
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.posts.find(p => p.id === Number(id))
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdatePostDto) {
    const post = await this.posts.find(p => p.id === Number(dto.id))
    return this.posts.find(p => p.id === Number(id))
  }

  // @Delete(':id')
  // async getById(@Param('id') id: string) {
  //   return this.posts.find(p => p.id === Number(id))
  // }
}
