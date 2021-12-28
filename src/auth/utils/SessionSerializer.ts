import { Inject } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { User } from 'src/schemas/user.schema';
import { UsersService } from 'src/users/services/users/users.service';

export class SessionSerializer extends PassportSerializer {
  constructor(
    @Inject('USER_SERVICE') private readonly usersService: UsersService,
  ) {
    super();
  }
  serializeUser(user: User, done: (err, user: User) => void) {
    console.log('SerializerUser:', user.email);
    done(null, user);
  }
  async deserializeUser(user: User, done: (err, user: User) => void) {
    console.log('deSerializeUser:', user.email);
    const userDB = await this.usersService.findUser(user.email);
    return userDB ? done(null, user) : done(null, null);
  }
}
