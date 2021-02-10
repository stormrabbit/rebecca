import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Roles } from '../entities/Roles';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Roles)
    private readonly rolesRepostory: Repository<Roles>,
  ) {}

  async findAll(): Promise<Roles[]> {
    return await this.rolesRepostory.query(
      'select * from roles where status <>1',
    );
  }
}
