import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class VerifyDTO {
  @ApiProperty({
    description: '待鉴定 url',
  })
  @IsNotEmpty({ message: '待鉴定 url 不能为空' })
  readonly url: string;
  @ApiProperty({
    description: '待鉴定方法',
  })
  @IsNotEmpty({ message: '请求方法不能为空' })
  readonly method: string;
}
