import { IsNotEmpty } from 'class-validator';
import { AssignmentsType } from 'src/entities/Assignments';

export class AssignmentDto {
  @IsNotEmpty({ message: '被分配 id 不能为空' })
  readonly xid: number;

  @IsNotEmpty({ message: '分配 id 不能为空' })
  readonly yid: number;

  readonly type: AssignmentsType;
}
