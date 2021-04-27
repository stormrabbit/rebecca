import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class UpdateRoleDto {
  readonly id: number;
  @ApiProperty({
    description: '权限名称',
  })
  @IsNotEmpty({ message: '角色名不能为空' })
  readonly name: string;
  status = 0;
}
