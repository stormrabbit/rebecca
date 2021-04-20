import { IsNotEmpty } from 'class-validator';

export class UpdateUserDto {
  readonly id: number;
  @IsNotEmpty({ message: '用户名不能为空' })
  readonly name: string;
  readonly status: number;
}
