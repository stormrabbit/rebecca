import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from '../entities/Users';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepostory: Repository<Users>,
  ) {}

  async findAll(): Promise<Users[]> {
    return await this.userRepostory.query(' select * from users');
  }
}
