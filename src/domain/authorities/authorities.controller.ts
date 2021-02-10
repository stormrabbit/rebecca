import { Controller, Get } from '@nestjs/common';
import { Authorities } from 'src/entities/authorities';
import { AuthoritiesService } from './authorities.service';

@Controller('authorities')
export class AuthoritiesController {
  constructor(private authoritiesService: AuthoritiesService) {}
  @Get('list')
  findAll(): Promise<Authorities[]> {
    return this.authoritiesService.findAll();
  }
}
