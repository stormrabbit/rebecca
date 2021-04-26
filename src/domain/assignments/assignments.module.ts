import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Assignments } from 'src/entities/Assignments';
import { AuthoritiesModule } from '../authorities/authorities.module';
import { EndpointsModule } from '../endpoints/endpoints.module';
import { RolesModule } from '../roles/roles.module';
import { UsersModule } from '../users/users.module';
import { AssignmentsController } from './assignments.controller';
import { AssignmentsService } from './assignments.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Assignments]),
    UsersModule,
    RolesModule,
    AuthoritiesModule,
    EndpointsModule,
  ],
  controllers: [AssignmentsController],
  providers: [AssignmentsService],
})
export class AssignmentsModule {}
