import { Controller, Get } from '@nestjs/common';
import { Groups } from 'src/entities/Groups';
import { GroupsService } from './groups.service';

@Controller('groups')
export class GroupsController {
  constructor(private groupsService: GroupsService) {}
  @Get('list')
  findAll(): Promise<Groups[]> {
    return this.groupsService.findAll();
  }
}
