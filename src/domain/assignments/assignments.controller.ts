import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Assignments, AssignmentsType } from 'src/entities/Assignments';
import { AuthoritiesService } from '../authorities/authorities.service';
import { EndpointsService } from '../endpoints/endpoints.service';
import { RolesService } from '../roles/roles.service';
import { UsersService } from '../users/users.service';
import { AssignmentsService } from './assignments.service';
import { AssignmentDto } from './dto/assignment.dto';
import { VerifyDTO } from './dto/verify.dot';

@ApiTags('分配')
@Controller('assignments')
export class AssignmentsController {
  constructor(
    private readonly assignmentsService: AssignmentsService,
    private readonly usersService: UsersService,
    private readonly rolesServcie: RolesService,
    private readonly authoritiesService: AuthoritiesService,
    private readonly endpointsService: EndpointsService,
  ) {}

  // @Get('list')
  async retrieveAssignments(@Query('type') type: AssignmentsType) {
    return this.assignmentsService.retireveAssignmentsByType(type);
  }

  @Post('create/user2role')
  @UsePipes(new ValidationPipe())
  async assignmentUser2Role(@Body() assignmentDto: AssignmentDto) {
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
  async assignmentRole2Authority(@Body() assignmentDto: AssignmentDto) {
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
  async assignmentAuthority2Endpoint(@Body() assignmentDto: AssignmentDto) {
    const assignment = Assignments.fromDto(
      assignmentDto,
      AssignmentsType.AUTHORITY_ENDPOINT,
    );
    if (assignment) {
      return await this.createAssignments(assignment);
    }
    throw new BadRequestException('请求参数错误');
  }

  @Patch('update/user2role/:id')
  async updateUser2Role(
    @Param('id') id: number,
    @Body() assignmentDto: AssignmentDto,
  ) {
    const assignment = Assignments.fromDto(
      assignmentDto,
      AssignmentsType.USER_ROLE,
    );
    if (assignment) {
      return await this.updateAssignments(id, assignment);
    }
  }

  @Patch('update/role2authority/:id')
  async updateRole2Authority(
    @Param('id') id: number,
    @Body() assignmentDto: AssignmentDto,
  ) {
    const assignment = Assignments.fromDto(
      assignmentDto,
      AssignmentsType.ROLE_AUTHORITY,
    );
    if (assignment) {
      return await this.updateAssignments(id, assignment);
    }
  }

  @Patch('update/authority2endpoint/:id')
  async updateAuthority2Endpoint(
    @Param('id') id: number,
    @Body() assignmentDto: AssignmentDto,
  ) {
    const assignment = Assignments.fromDto(
      assignmentDto,
      AssignmentsType.AUTHORITY_ENDPOINT,
    );
    if (assignment) {
      return await this.updateAssignments(id, assignment);
    }
  }

  // 查看用户下角色
  @Get('retrieve/user2role/:id')
  async retieveUserAndRoleByUserId(@Param('id') userid: number) {
    const assignments: Assignments[] = await this.assignmentsService.retieveByIdAndType(
      userid,
      AssignmentsType.USER_ROLE,
    );
    const roles = await Promise.all(
      assignments.map(async (assignment) => {
        return await this.rolesServcie.retrieveById(assignment.yId);
      }),
    );
    const user = await this.usersService.retrieveById(userid);
    return { user, roles };
  }

  // 查看角色下权限
  @Get('retrieve/role2authority/:id')
  async retieveRoleAndAuthorityByRoleId(@Param('id') roleid: number) {
    const assignments: Assignments[] = await this.assignmentsService.retieveByIdAndType(
      roleid,
      AssignmentsType.ROLE_AUTHORITY,
    );
    const authorities = await Promise.all(
      assignments.map(async (assignment) => {
        return await this.authoritiesService.retrieveById(assignment.yId);
      }),
    );
    const role = await this.rolesServcie.retrieveById(roleid);
    return { role, authorities };
  }

  // 查看权限下资源
  @Get('retrieve/authority2endpoint/:id')
  async retieveAuthorityAndEndpointByAuthorityId(
    @Param('id') authorityid: number,
  ) {
    const assignments: Assignments[] = await this.assignmentsService.retieveByIdAndType(
      authorityid,
      AssignmentsType.AUTHORITY_ENDPOINT,
    );
    const endpoints = await Promise.all(
      assignments.map(async (assignment) => {
        return await this.endpointsService.retrieveById(assignment.yId);
      }),
    );
    const authority = await this.authoritiesService.retrieveById(authorityid);
    return { authority, endpoints };
  }

  @Get('verify/:id')
  async retrieveUserAndEndpoints(
    @Param('id') userid: number,
    @Query() verifyDto: VerifyDTO,
  ) {
    const endpoint = await this.endpointsService.retrieveByUrlAndMethod(
      verifyDto,
    );
    if (!endpoint || !endpoint.methods.includes(verifyDto.method)) {
      throw new BadRequestException('并无此请求');
    }

    const endpointAuthorities: Assignments[] = await this.assignmentsService.retieveAuthoritiesByEndpointId(
      endpoint.id,
    );
    const roles: Assignments[] = await this.assignmentsService.retieveRolesByAuthorities(
      endpointAuthorities.map((authority) => authority.xId),
    );
    const userRoles: Assignments[] = await this.assignmentsService.retireveAssignmentsByUserId(
      userid,
    );
    const flag = roles.some((role) =>
      userRoles.find((userRole) => userRole.xId === role.xId),
    );
    if (flag) return { msg: '请求通过' };
    throw new BadRequestException(
      `您没有使用${verifyDto.method.toUpperCase()}请求访问${
        verifyDto.url
      }的权限`,
    );
  }

  async createAssignments(assignment: Assignments) {
    const isLegal = await this.validateData(assignment);
    if (isLegal) {
      return this.assignmentsService.createAssignment(assignment);
    }
    throw new BadRequestException('数据不存在！');
  }

  async updateAssignments(assignmentId: number, assignment: Assignments) {
    const isLegal = await this.validateData(assignment);
    if (isLegal) {
      return this.assignmentsService.updateAssignment(assignmentId, assignment);
    }
    throw new BadRequestException('数据不存在！');
  }

  private async validateData(assignment: Assignments): Promise<boolean> {
    switch (assignment.type) {
      case AssignmentsType.ROLE_AUTHORITY: {
        const role = await this.rolesServcie.retrieveById(assignment.xId);
        const authority = await this.authoritiesService.retrieveById(
          assignment.yId,
        );
        return !!authority && !!role;
      }
      case AssignmentsType.USER_ROLE: {
        const user = await this.usersService.retrieveById(assignment.xId);
        const role = await this.rolesServcie.retrieveById(assignment.yId);
        return !!role && !!user;
      }
      case AssignmentsType.AUTHORITY_ENDPOINT: {
        const endpoint = await this.endpointsService.retrieveById(
          assignment.yId,
        );
        const authority = await this.authoritiesService.retrieveById(
          assignment.xId,
        );
        return !!endpoint && !!authority;
      }
      default:
        return false;
    }
  }
}
