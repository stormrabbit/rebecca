import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Endpoints } from '../../entities/Endpoints';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class EndpointsService {
  constructor(
    @InjectRepository(Endpoints)
    private readonly EndpointsRepostory: Repository<Endpoints>,
  ) {}

  async findAll(): Promise<Endpoints[]> {
    return await this.EndpointsRepostory.query(
      'select * from endpoints where status <>1;',
    );
  }
}
