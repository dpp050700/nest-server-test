import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { QueryUserDto } from './dto/query-user.dto';
import { BusinessException } from 'src/common/exceptions/business.exception';
import { ErrorCodeEnum } from 'src/constants/error-code.constant';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectEntityManager() private entityManager: EntityManager,
  ) {}

  async create({ email, password, ...rest }: CreateUserDto) {
    const isExist = await this.userRepository.findOneBy({
      email,
    });

    if (isExist) {
      throw new BusinessException(ErrorCodeEnum.USER_EXIST);
    }

    if (!password) {
      throw new BusinessException(ErrorCodeEnum.USER_PASSWORD_EMPTY);
    }

    await this.entityManager.transaction(async (manager) => {
      const user = manager.create(UserEntity, { email, password, ...rest });
      const result = await manager.save(user);
      return result;
    });
  }

  async findOneByEmail(email: string) {
    return this.userRepository.findOneBy({ email });
  }

  list(queryUserDto: QueryUserDto) {
    const queryBuilder = this.userRepository.createQueryBuilder('user');

    return queryBuilder.getMany();
    // if (queryUserDto.page == 1) {
    //   throw new BusinessException(ErrorCodeEnum.SERVER_ERROR, queryUserDto);
    // }
    // if (queryUserDto.page == 11) {
    //   throw new HttpException('error', HttpStatus.BAD_REQUEST);
    // }
    // return queryUserDto;
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
