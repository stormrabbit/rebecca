import { HttpModule, HttpService, Module } from '@nestjs/common';
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
import { AuthModule } from './domain/auth/auth.module';
import { UsersController } from './domain/users/users.controller';
import { AssignmentsModule } from './domain/assignments/assignments.module';
import { RolesController } from './domain/roles/roles.controller';
import { AppController } from './app.controller';
import { AppService } from './app.service';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'billy',
      password: '123456',
      database: 'rebecca',
      entities: [__dirname + '/**/*{.ts,.js}'],
      synchronize: true,
    }),
    UsersModule,
    RolesModule,
    AuthoritiesModule,
    EndpointsModule,
    GroupsModule,
    AuthModule,
    AssignmentsModule,
    HttpModule,
  ],
  controllers: [UsersController, RolesController, AppController],
  providers: [AppService],
  exports: [],
})
export class AppModule {}
