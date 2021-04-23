import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from '../../entities/Users';
import { CreateUserDto } from './dto/create.dto';
import { UpdateUserDto } from './dto/update.dto';
import { UpdateUserResult } from './dto/update.result.dto';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepostory: Repository<Users>,
  ) {}

  async createUser(createDto: CreateUserDto): Promise<Users> {
    return await this.userRepostory.save(createDto);
  }

  async retrieveList(): Promise<Users[]> {
    return await this.userRepostory.query(
      ' select * from users where status <> 1',
    );
  }

  async retrieveById(id: number): Promise<Users> {
    return await this.userRepostory.findOne(id);
  }

  async retrieveByName(name: string): Promise<Users> {
    return await this.userRepostory.query(
      `select * from users where name ='${name}'`,
    );
  }

  async updateUserById(
    id: string,
    updateDto: UpdateUserDto,
  ): Promise<UpdateUserResult> {
    const result = new UpdateUserResult();
    try {
      await this.userRepostory.update(id, updateDto);
      result.result = '修改成功';
    } catch (error) {
      result.result = `${error}`;
    }

    return result;
  }

  async deleteUserById(id: number) {
    const user = await this.retrieveById(id);
    user.status = 1;
    const result = new UpdateUserResult();
    try {
      await this.userRepostory.update(id, user);
      result.result = '删除成功';
    } catch (error) {
      result.result = `${error}`;
    }
    return result;
  }
}
