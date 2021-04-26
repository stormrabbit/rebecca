import { Endpoints } from 'src/entities/Endpoints';
import { EndpointsService } from './endpoints.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateEndpointDto } from './dto/create.dto';
import { UpdateEndpointDto } from './dto/update.dto';
@Controller('endpoints')
export class EndpointsController {
  constructor(private endpointsService: EndpointsService) {}
  @Get('list')
  retrieveList(): Promise<Endpoints[]> {
    return this.endpointsService.retrieveList();
  }

  @Get(':id')
  retrieveById(@Param('id') id: number): Promise<Endpoints> {
    return this.endpointsService.retrieveById(id);
  }

  @Post('create')
  createEndpoint(@Body() createDto: CreateEndpointDto): Promise<Endpoints> {
    return this.endpointsService.createEndpoint(createDto);
  }

  @Patch(':id')
  updateEndpointById(
    @Param('id') id: number,
    updateDto: UpdateEndpointDto,
  ): Promise<any> {
    return this.endpointsService.updateEndpointById(id, updateDto);
  }

  @Delete(':id')
  deleteEndpointById(@Param('id') id: number) {
    return this.endpointsService.deleteEndpointById(id);
  }
}
