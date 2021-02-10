import { Controller, Get } from '@nestjs/common';
import { Roles } from 'src/entities/Roles';
import { RolesService } from './roles.service';

@Controller('roles')
export class RolesController {
  constructor(private rolesService: RolesService) {}
  @Get('list')
  findAll(): Promise<Roles[]> {
    return this.rolesService.findAll();
  }

  //   @Get('list')
  //   test(): any {
  //     return 'test';
  //   }
}
