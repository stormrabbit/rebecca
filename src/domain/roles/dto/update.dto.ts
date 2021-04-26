import { IsNotEmpty } from 'class-validator';

export class UpdateRoleDto {
  readonly id: number;
  @IsNotEmpty({ message: '角色名不能为空' })
  readonly name: string;
  readonly status: number;
}
