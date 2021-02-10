import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Endpoints } from 'src/entities/Endpoints';
import { EndpointsController } from './endpoints.controller';
import { EndpointsService } from './endpoints.service';

@Module({
  imports: [TypeOrmModule.forFeature([Endpoints])],
  controllers: [EndpointsController],
  providers: [EndpointsService],
})
export class EndpointsModule {}
