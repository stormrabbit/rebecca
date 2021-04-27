import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Authorities } from 'src/entities/authorities';
import { AuthoritiesService } from './authorities.service';
import { CreateAuthorityDto } from './dto/create.dto';
import { UpdateAuthorityDto } from './dto/update.dto';

@ApiTags('权限')
@Controller('authorities')
export class AuthoritiesController {
  constructor(private authoritiesService: AuthoritiesService) {}
  @Get('list')
  retrieveList(): Promise<Authorities[]> {
    return this.authoritiesService.retrieveList();
  }

  @Get(':id')
  retrieveById(@Param('id') id: number): Promise<Authorities> {
    return this.authoritiesService.retrieveById(id);
  }

  @Post('create')
  createAuthority(@Body() createDto: CreateAuthorityDto): Promise<Authorities> {
    return this.authoritiesService.createAuthority(createDto);
  }

  @Patch(':id')
  updateAuthorityById(
    @Param('id') id: number,
    @Body() updateDto: UpdateAuthorityDto,
  ): Promise<any> {
    return this.authoritiesService.updateAuthorityById(id, updateDto);
  }

  @Delete(':id')
  deleteAuthorityById(@Param('id') id: number) {
    return this.authoritiesService.deleteAuthorityById(id);
  }
}
