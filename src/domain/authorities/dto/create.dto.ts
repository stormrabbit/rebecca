import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateAuthorityDto {
  @ApiProperty({
    description: '权限名称',
  })
  @IsNotEmpty({ message: '权限名称不能为空' })
  readonly name: string;
}
