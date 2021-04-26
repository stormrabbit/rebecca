import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Assignments, AssignmentsType } from 'src/entities/Assignments';
import { Repository } from 'typeorm';
import { AssignmentDto } from './dto/assignment.dto';

@Injectable()
export class AssignmentsService {
  constructor(
    @InjectRepository(Assignments)
    private readonly assignmentRepostory: Repository<Assignments>,
  ) {}

  async createAssignment(assignment: Assignments): Promise<Assignments> {
    return this.assignmentRepostory.save(assignment);
  }

  async retireveAssignmentsByType(type: AssignmentsType) {
    return this.assignmentRepostory.query(
      `select * from assignments where status <> 1 and type=${type}`,
    );
  }
}
