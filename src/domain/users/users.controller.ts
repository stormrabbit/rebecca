import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Users } from 'src/entities/Users';
import { CreateUserDto } from './dto/create.dto';
import { UpdateUserDto } from './dto/update.dto';
import { UpdateUserResult } from './dto/update.result.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('list')
  retrieveList(): Promise<Users[]> {
    return this.usersService.retrieveList();
  }

  @Get()
  retrieveById(@Query() id: number): Promise<Users> {
    return this.usersService.retrieveById(id);
  }

  @Post('')
  @UsePipes(new ValidationPipe())
  createUser(@Body() createDto: CreateUserDto): Promise<Users> {
    console.log(createDto);
    return this.usersService.createUser(createDto);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  updateUser(
    @Param() id: string,
    @Body() updateDto: UpdateUserDto,
  ): Promise<UpdateUserResult> {
    return this.usersService.updateUserById(id, updateDto);
  }

  @Delete(':id')
  deleteUser(@Param() id: number): Promise<any> {
    return this.usersService.deleteUserById(id);
  }
}
