import { AssignmentDto } from 'src/domain/assignments/dto/assignment.dto';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('assignments', { schema: 'rebecca' })
export class Assignments extends BaseEntity {
  static fromObj({ x_id, x_name, y_id, y_name, status, type, id }: any = {}) {
    const assignment = new Assignments();
    assignment.id = id;
    assignment.xId = x_id;
    assignment.yId = y_id;
    assignment.xName = x_name;
    assignment.yName = y_name;
    assignment.status = status;
    assignment.type = type;
    return assignment;
  }
  static fromDto(
    assignmentDto: AssignmentDto,
    type: AssignmentsType,
  ): Assignments {
    if (!assignmentDto) {
      return null;
    }
    const sources = type.split('_');
    if (!sources || sources.length !== 2) {
      return null;
    }
    if (!type) {
      return null;
    }
    const saveDto = new Assignments();
    saveDto.xId = assignmentDto.xid;
    saveDto.xName = sources[0];
    saveDto.yId = assignmentDto.yid;
    saveDto.yName = sources[1];
    saveDto.type = type;
    return saveDto;
  }
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number;

  @Column('varchar', { name: 'x_name', length: 20 })
  xName: string;

  @Column('int', { name: 'x_id', unsigned: true })
  xId: number;

  @Column('varchar', { name: 'y_name', length: 20 })
  yName: string;

  @Column('int', { name: 'y_id', unsigned: true })
  yId: number;

  @Column('varchar', { name: 'type', length: 40 })
  type: string;

  @Column('tinyint', { name: 'status', default: () => "'0'" })
  status: number;
}

export enum AssignmentsType {
  USER_ROLE = 'user_role',
  ROLE_AUTHORITY = 'role_authority',
  AUTHORITY_ENDPOINT = 'authority_endpoint',
}
