import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Roles } from '../../entities/Roles';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRoleDto } from './dto/create.dto';
import { UpdateRoleDto } from './dto/update.dto';
@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Roles)
    private readonly rolesRepostory: Repository<Roles>,
  ) {}

  async createRole(createDto: CreateRoleDto): Promise<Roles> {
    return await this.rolesRepostory.save(createDto);
  }

  async retrieveList(): Promise<Roles[]> {
    return await this.rolesRepostory.query(
      ' select * from roles where status <> 1',
    );
  }

  async retrieveById(id: number): Promise<Roles> {
    return await this.rolesRepostory.findOne(id);
  }

  async retrieveByName(name: string): Promise<Roles> {
    return await this.rolesRepostory.query(
      `select * from Roles where name ='${name}'`,
    );
  }

  async updateRolesById(id: number, updateDto: UpdateRoleDto): Promise<any> {
    try {
      await this.rolesRepostory.update(id, updateDto);
      return { result: '修改成功' };
    } catch (error) {
      return { error: `${error}` };
    }
  }

  async deleteRolesById(id: number) {
    const Roles = await this.retrieveById(id);
    Roles.status = 1;
    try {
      await this.rolesRepostory.update(id, Roles);
      return { result: '删除成功' };
    } catch (error) {
      return { error: `${error}` };
    }
  }
}
