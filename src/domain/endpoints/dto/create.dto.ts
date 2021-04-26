import { IsNotEmpty } from 'class-validator';

export class CreateEndpointDto {
  @IsNotEmpty({ message: '资源名称不能为空' })
  readonly name: string;

  @IsNotEmpty({ message: '请求方法不能为空' })
  readonly methods: string;

  @IsNotEmpty({ message: '请求方法不能为空' })
  readonly url: string;

  readonly description: string | null;

  readonly parentId: number | null;
}
