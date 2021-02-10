import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Roles } from './entities/Roles';
import { Users } from './entities/Users';
import { Authorities } from './entities/Authorities';
import { Endpoints } from './entities/Endpoints';
import { Groups } from './entities/Groups';
import { UsersModule } from './domain/users/users.module';
import { RolesModule } from './domain/roles/roles.module';
import { AuthoritiesModule } from './domain/authorities/authorities.module';
import { EndpointsModule } from './domain/endpoints/endpoints.module';
import { GroupsModule } from './domain/groups/groups.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'billy',
      password: '123456',
      database: 'rebecca',
      entities: [Roles, Users, Authorities, Endpoints, Groups],
      synchronize: true,
    }),
    UsersModule,
    RolesModule,
    AuthoritiesModule,
    EndpointsModule,
    GroupsModule,
  ],
})
export class AppModule {}
