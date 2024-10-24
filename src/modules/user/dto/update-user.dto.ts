import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsInt, IsNotEmpty } from 'class-validator';

export class UpdateUserDto extends PartialType(
  OmitType(CreateUserDto, ['email']),
) {
  @IsNotEmpty({ message: '用户 ID 必传' })
  @IsInt()
  id: number;
}
