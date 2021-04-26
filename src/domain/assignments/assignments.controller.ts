import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Assignments, AssignmentsType } from 'src/entities/Assignments';
import { AuthoritiesService } from '../authorities/authorities.service';
import { EndpointsService } from '../endpoints/endpoints.service';
import { RolesService } from '../roles/roles.service';
import { UsersService } from '../users/users.service';
import { AssignmentsService } from './assignments.service';
import { AssignmentDto } from './dto/assignment.dto';

@Controller('assignments')
export class AssignmentsController {
  constructor(
    private readonly assignmentsService: AssignmentsService,
    private readonly usersService: UsersService,
    private readonly rolesServcie: RolesService,
    private readonly authoritiesService: AuthoritiesService,
    private readonly endpointsService: EndpointsService,
  ) {}

  @Get()
  async retrieveAssignments(type: AssignmentsType) {
    return this.assignmentsService.retireveAssignmentsByType(type);
  }

  @Post('create/user2role')
  @UsePipes(new ValidationPipe())
  async assignmentUserToRole(@Body() assignmentDto: AssignmentDto) {
    const assignment = Assignments.fromDto(
      assignmentDto,
      AssignmentsType.USER_ROLE,
    );
    if (assignment) {
      return await this.createAssignments(assignment);
    }
    throw new BadRequestException('请求参数错误');
  }

  @Post('create/role2authority')
  @UsePipes(new ValidationPipe())
  async assignmentRoleToAuthority(@Body() assignmentDto: AssignmentDto) {
    const assignment = Assignments.fromDto(
      assignmentDto,
      AssignmentsType.ROLE_AUTHORITY,
    );
    if (assignment) {
      return await this.createAssignments(assignment);
    }
    throw new BadRequestException('请求参数错误');
  }

  @Post('create/authority2endpoint')
  @UsePipes(new ValidationPipe())
  async assignmentAuthorityToEndpoint(@Body() assignmentDto: AssignmentDto) {
    const assignment = Assignments.fromDto(
      assignmentDto,
      AssignmentsType.AUTHORITY_ENDPOINT,
    );
    if (assignment) {
      return await this.createAssignments(assignment);
    }
    throw new BadRequestException('请求参数错误');
  }

  async createAssignments(assignment: Assignments) {
    switch (assignment.type) {
      case AssignmentsType.ROLE_AUTHORITY:
        {
          const role = await this.rolesServcie.retrieveById(assignment.xId);
          const authority = await this.authoritiesService.retrieveById(
            assignment.yId,
          );
          if (!role || !authority) {
            throw new BadRequestException('请求参数错误!');
          }
        }
        break;
      case AssignmentsType.USER_ROLE:
        {
          const user = await this.usersService.retrieveById(assignment.xId);
          const role = await this.rolesServcie.retrieveById(assignment.yId);
          if (!role || !user) {
            throw new BadRequestException('请求参数错误!');
          }
        }
        break;
      case AssignmentsType.AUTHORITY_ENDPOINT:
        {
          const endpoint = await this.endpointsService.retrieveById(
            assignment.yId,
          );
          const authority = await this.authoritiesService.retrieveById(
            assignment.xId,
          );
          if (!endpoint || !authority) {
            throw new BadRequestException('请求参数错误!');
          }
        }
        break;
      default:
        throw new BadRequestException('请求参数错误!');
    }
    return this.assignmentsService.createAssignment(assignment);
  }
}
