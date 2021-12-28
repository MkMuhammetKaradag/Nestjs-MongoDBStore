import { Inject, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/services/users/users.service';
import { comparePasswords } from 'src/utils/bcryp';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_SERVICE') private readonly userService: UsersService,
  ) {}
  async validateuser(email: string, password: string) {
    console.log('inside  validateUser');
    const userDB = await this.userService.findUser(email);
    if (userDB) {
      const matched = comparePasswords(password, userDB.password);
      if (matched) {
        console.log('user validation Success!');
        userDB.password = undefined;
        return userDB;
      } else {
        console.log('password do not  match');
        return null;
      }
    } else {
      console.log('userNot Found');
      return null;
    }
  }
}
