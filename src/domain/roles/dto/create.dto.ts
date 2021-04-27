import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({
    description: '权限名称',
  })
  @IsNotEmpty({ message: '权限名称不能为空' })
  readonly name: string;
}
