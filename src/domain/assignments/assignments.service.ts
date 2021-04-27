import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Assignments, AssignmentsType } from 'src/entities/Assignments';
import { getConnection, Repository } from 'typeorm';

@Injectable()
export class AssignmentsService {
  async retieveAuthoritiesByEndpointId(id: number) {
    return await this.assignmentRepostory.find({
      where: {
        yId: id,
        type: AssignmentsType.AUTHORITY_ENDPOINT,
        status: 0,
      },
    });
  }
  constructor(
    @InjectRepository(Assignments)
    private readonly assignmentRepostory: Repository<Assignments>,
  ) {}

  async retieveByIdAndType(
    userid: number,
    type: AssignmentsType,
  ): Promise<Assignments[]> {
    return this.assignmentRepostory.find({
      where: {
        type,
        xId: userid,
        status: 0,
      },
    });
    // return this.assignmentRepostory.query(
    //   `select * from assignments where status <> 1 and type='${type}' and x_id = ${userid}`,
    // );
  }
  async createAssignment(assignment: Assignments): Promise<Assignments> {
    return this.assignmentRepostory.save(assignment);
  }

  async retireveAssignmentsByType(
    type: AssignmentsType,
  ): Promise<Assignments[]> {
    const typeOptions = type ? { type } : {};
    return this.assignmentRepostory.find({
      where: {
        status: 0,
        ...typeOptions,
      },
    });
    // return this.assignmentRepostory.query(
    //   `select * from assignments where status <> 1 ${
    //     type ? `and type='${type}'` : ''
    //   }`,
    // );
  }

  retireveAssignmentsByUserId(
    userid: number,
  ): Assignments[] | PromiseLike<Assignments[]> {
    return this.assignmentRepostory.find({
      where: {
        type: AssignmentsType.USER_ROLE,
        xId: userid,
      },
    });
  }
  async retieveRolesByAuthorities(ids: number[]): Promise<Assignments[]> {
    const rowDataPackets = await getConnection()
      .createQueryBuilder()
      .select()
      .from(Assignments, 'assignments')
      .where('y_id in :ids', { ids })
      .where('type = :type', {
        type: AssignmentsType.ROLE_AUTHORITY,
      })
      .execute();
    const assignments: Assignments[] = rowDataPackets.map((obj) =>
      Assignments.fromObj(JSON.parse(JSON.stringify(obj))),
    );
    return assignments;
    // return this.assignmentRepostory.find({
    //   where: {
    //     yId: ids,
    //     type: AssignmentsType.ROLE_AUTHORITY,
    //   },
    // });
  }

  async updateAssignment(assignmentId: number, assignment: Assignments) {
    return this.assignmentRepostory.update(assignmentId, assignment);
  }
}
