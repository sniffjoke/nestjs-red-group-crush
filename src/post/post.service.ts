import { Body, Delete, Get, Injectable, Param, Post, Put } from '@nestjs/common'
import { CreatePostDto } from './post.dto/create-post.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { PostEntity } from './post.entity'
import { Repository } from 'typeorm'

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>
  ) {}

  async getAll() {
    return this.postRepository.find()
  }

  async create(dto: CreatePostDto) {
    const post = this.postRepository.create(dto)
    return await this.postRepository.save(post)
  }

  async getById(id: string) {
    return this.postRepository.findOne({
      where: {
        id: Number(id)
      }
    })
  }

  async update(id: string, dto: CreatePostDto) {
    const post = await this.getById(id)
    post.content = dto.content
    post.userName = dto.userName
    return await this.postRepository.save(post)
  }

  async delete(id: string) {
    return await this.postRepository.delete({ id: Number(id) })
  }
}
