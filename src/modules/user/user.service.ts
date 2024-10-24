import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { QueryUserDto } from './dto/query-user.dto';
import { BusinessException } from 'src/common/exceptions/business.exception';
import { ErrorCodeEnum } from 'src/constants/error-code.constant';

@Injectable()
export class UserService {
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  list(queryUserDto: QueryUserDto) {
    if (queryUserDto.page == 1) {
      throw new BusinessException(ErrorCodeEnum.SERVER_ERROR, queryUserDto);
    }
    if (queryUserDto.page == 11) {
      throw new HttpException('error', HttpStatus.BAD_REQUEST);
    }
    return queryUserDto;
  }

  info(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
