import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UserService } from '../user/user.service';
import { BusinessException } from 'src/common/exceptions/business.exception';
import { ErrorCodeEnum } from 'src/constants/error-code.constant';
import { decryptPassword } from 'src/utils/crypto.util';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}
  async login({ email, password: inputPassword }: LoginDto) {
    const user = await this.userService.findOneByEmail(email);

    if (!user) {
      throw new BusinessException(ErrorCodeEnum.USER_NOT_FOUND);
    }
    const { password: encryptedPassword, password_salt: salt } = user;

    const password = decryptPassword(encryptedPassword, salt);

    if (password !== inputPassword) {
      throw new BusinessException(ErrorCodeEnum.USER_PASSWORD_ERROR);
    }
    return user;
  }
}
