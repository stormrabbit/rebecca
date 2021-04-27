import { IsNotEmpty } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
export class CreateEndpointDto {
  @ApiProperty({
    description: '资源名称',
  })
  @IsNotEmpty({ message: '资源名称不能为空' })
  readonly name: string;

  @ApiProperty({ description: '请求方法' })
  @IsNotEmpty({ message: '请求方法不能为空' })
  readonly methods: string;

  @ApiProperty({ description: '请求 url' })
  @IsNotEmpty({ message: '请求 url 不能为空' })
  readonly url: string;

  @ApiPropertyOptional({
    description: '资源描述',
  })
  readonly description: string | null;

  parentId: number | null;
}
