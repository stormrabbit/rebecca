import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Groups } from 'src/entities/Groups';
import { GroupsService } from './groups.service';

@ApiTags('组')
@Controller('groups')
export class GroupsController {
  constructor(private groupsService: GroupsService) {}
  @Get('list')
  findAll(): Promise<Groups[]> {
    return this.groupsService.findAll();
  }
}
