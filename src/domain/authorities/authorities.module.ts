import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Authorities } from 'src/entities/Authorities';
import { AuthoritiesController } from './authorities.controller';
import { AuthoritiesService } from './authorities.service';

@Module({
  imports: [TypeOrmModule.forFeature([Authorities])],
  controllers: [AuthoritiesController],
  providers: [AuthoritiesService],
  exports: [AuthoritiesService, TypeOrmModule.forFeature([Authorities])],
})
export class AuthoritiesModule {}
