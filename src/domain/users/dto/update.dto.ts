import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({
    description: 'id',
  })
  readonly id: number;
  @ApiProperty({
    description: '用户名',
  })
  @IsNotEmpty({ message: '用户名不能为空' })
  readonly name: string;
  @ApiProperty({
    description: '状态',
  })
  readonly status: number;
}
