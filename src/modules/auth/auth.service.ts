import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UserService } from '../user/user.service';
import { BusinessException } from 'src/common/exceptions/business.exception';
import { ErrorCodeEnum } from 'src/constants/error-code.constant';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}
  async login({ email, password }: LoginDto) {
    const user = await this.userService.findOneByEmail(email);
    if (!user) {
      throw new BusinessException(ErrorCodeEnum.USER_NOT_FOUND);
    }

    if (user.password !== password) {
      throw new BusinessException(ErrorCodeEnum.USER_PASSWORD_ERROR);
    }
    return user;
  }
}
