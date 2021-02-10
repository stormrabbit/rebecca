import { Controller, Get } from '@nestjs/common';
import { Endpoints } from 'src/entities/Endpoints';
import { EndpointsService } from './endpoints.service';

@Controller('endpoints')
export class EndpointsController {
  constructor(private endpointsService: EndpointsService) {}
  @Get('list')
  findAll(): Promise<Endpoints[]> {
    return this.endpointsService.findAll();
  }
}
