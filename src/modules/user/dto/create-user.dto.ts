import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, Matches } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: '用户名', required: false })
  @IsOptional()
  username?: string;

  @ApiProperty({ description: '邮箱' })
  @IsNotEmpty({ message: 'email 不能为空' })
  email: string;

  @ApiProperty({ description: '密码' })
  @Matches(/^\S*(?=\S{6})(?=\S*\d)(?=\S*[A-Z])\S*$/i, {
    message: '密码必须包含数字、字母，长度为6-16',
  })
  @IsNotEmpty({ message: '密码不能为空' })
  password: string;
}
