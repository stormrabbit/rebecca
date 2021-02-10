import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Groups } from '../../entities/Groups';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Groups)
    private readonly groupsRepostory: Repository<Groups>,
  ) {}

  async findAll(): Promise<Groups[]> {
    return await this.groupsRepostory.query(
      'select * from rebecca.groups where status <>1;',
    );
  }
}
