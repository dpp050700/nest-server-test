import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { QueryUserDto } from './dto/query-user.dto';
import { BusinessException } from 'src/common/exceptions/business.exception';

@Injectable()
export class UserService {
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll(queryUserDto: QueryUserDto) {
    if (queryUserDto.page == 1) {
      // throw new HttpException('123', HttpStatus.BAD_REQUEST);
      throw new BusinessException(205, queryUserDto, '用户被锁定');
    }
    return queryUserDto;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
