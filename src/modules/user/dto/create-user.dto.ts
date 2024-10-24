import { IsNotEmpty, IsOptional, Matches } from 'class-validator';

export class CreateUserDto {
  @IsOptional()
  username?: string;

  @IsNotEmpty({ message: 'email 不能为空' })
  email: string;

  @Matches(/^\S*(?=\S{6})(?=\S*\d)(?=\S*[A-Z])\S*$/i, {
    message: '密码必须包含数字、字母，长度为6-16',
  })
  @IsNotEmpty({ message: '密码不能为空' })
  password: string;
}
