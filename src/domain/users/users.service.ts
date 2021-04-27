import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from '../../entities/Users';
import { CreateUserDto } from './dto/create.dto';
import { UpdateUserDto } from './dto/update.dto';
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
    return await this.userRepostory.findOne({
      where: {
        name,
      },
    });
  }

  async updateUserById(id: string, updateDto: UpdateUserDto): Promise<any> {
    try {
      await this.userRepostory.update(id, updateDto);
      return '修改成功';
    } catch (error) {
      return `${error}`;
    }
  }

  async deleteUserById(id: number) {
    const user = await this.retrieveById(id);
    user.status = 1;
    try {
      await this.userRepostory.update(id, user);
      return '删除成功';
    } catch (error) {
      return `${error}`;
    }
  }
}
