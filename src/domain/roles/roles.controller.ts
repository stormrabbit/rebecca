import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/entities/Roles';
import { CreateRoleDto } from './dto/create.dto';
import { UpdateRoleDto } from './dto/update.dto';
import { RolesService } from './roles.service';

@ApiTags('角色')
@Controller('roles')
export class RolesController {
  constructor(private rolesService: RolesService) {}
  @Get('list')
  retrieveList(): Promise<Roles[]> {
    return this.rolesService.retrieveList();
  }

  @Get(':id')
  retrieveById(@Param('id') id: number): Promise<Roles> {
    return this.rolesService.retrieveById(id);
  }

  @Post('create')
  createRole(@Body() createDto: CreateRoleDto): Promise<Roles> {
    return this.rolesService.createRole(createDto);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  updateRoleById(
    @Param('id') id: number,
    @Body() updateDto: UpdateRoleDto,
  ): Promise<any> {
    return this.rolesService.updateRolesById(id, updateDto);
  }

  @Delete(':id')
  deleteRoleById(@Param('id') id: number) {
    return this.rolesService.deleteRolesById(id);
  }
}
