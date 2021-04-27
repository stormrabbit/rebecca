import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: '用户名',
    example: '用户A',
  })
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({
    description: '密码',
    example: '123',
  })
  pwd: string;
}
