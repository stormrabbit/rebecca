import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Groups } from 'src/entities/Groups';
import { GroupsController } from './groups.controller';
import { GroupsService } from './groups.service';

@Module({
  imports: [TypeOrmModule.forFeature([Groups])],
  controllers: [GroupsController],
  providers: [GroupsService],
})
export class GroupsModule {}
