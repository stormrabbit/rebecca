import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
// import { AssignmentsType } from 'src/entities/Assignments';

export class AssignmentDto {
  @ApiProperty({
    description: '分配源 id',
  })
  @IsNotEmpty({ message: '被分配 id 不能为空' })
  readonly xid: number;

  @ApiProperty({
    description: '被分配 id',
  })
  @IsNotEmpty({ message: '分配 id 不能为空' })
  readonly yid: number;

  // readonly type: AssignmentsType;
}
