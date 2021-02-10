import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Authorities } from '../../entities/Authorities';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class AuthoritiesService {
  constructor(
    @InjectRepository(Authorities)
    private readonly authoritiesRepostory: Repository<Authorities>,
  ) {}

  async findAll(): Promise<Authorities[]> {
    return await this.authoritiesRepostory.query(
      'select * from authorities where status <>1;',
    );
  }
}
