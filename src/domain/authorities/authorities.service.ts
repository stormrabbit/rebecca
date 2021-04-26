import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Authorities } from '../../entities/Authorities';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAuthorityDto } from './dto/create.dto';
import { UpdateAuthorityDto } from './dto/update.dto';
@Injectable()
export class AuthoritiesService {
  constructor(
    @InjectRepository(Authorities)
    private readonly authoritiesRepostory: Repository<Authorities>,
  ) {}

  async createAuthority(createDto: CreateAuthorityDto): Promise<Authorities> {
    return await this.authoritiesRepostory.save(createDto);
  }

  async retrieveList(): Promise<Authorities[]> {
    return await this.authoritiesRepostory.query(
      ' select * from authorities where status <> 1',
    );
  }

  async retrieveById(id: number): Promise<Authorities> {
    return await this.authoritiesRepostory.findOne(id);
  }

  async retrieveByName(name: string): Promise<Authorities> {
    return await this.authoritiesRepostory.query(
      `select * from authorities where name ='${name}'`,
    );
  }

  async updateAuthorityById(
    id: number,
    updateDto: UpdateAuthorityDto,
  ): Promise<any> {
    try {
      await this.authoritiesRepostory.update(id, updateDto);
      return { result: '修改成功' };
    } catch (error) {
      return { result: `${error}` };
    }
  }

  async deleteAuthorityById(id: number) {
    const Authority = await this.retrieveById(id);
    Authority.status = 1;
    try {
      await this.authoritiesRepostory.update(id, Authority);
      return { result: '删除成功' };
    } catch (error) {
      return { result: `${error}` };
    }
  }
}
