import { IsNotEmpty } from 'class-validator';

export class CreateRoleDto {
  @IsNotEmpty({ message: '权限名称不能为空' })
  readonly name: string;
}
