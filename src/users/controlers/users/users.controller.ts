import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  UseFilters,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthenticatedGuard } from 'src/auth/utils/LocalGuard';
import { User } from 'src/schemas/user.schema';
import { UserCreateDto } from 'src/users/dto/create-User.dto';
import { UserNotFoundExeption } from 'src/users/exeptions/UserNotFound.exeptions';
import { HttpExceptionFilter } from 'src/users/filters/http-exception.filter';
import { UsersService } from 'src/users/services/users/users.service';
// import { SerializedUser } from 'src/users/types';

@Controller('users')
export class UsersController {
  constructor(
    @Inject('USER_SERVICE') private readonly usersService: UsersService,
  ) {}

  // @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(AuthenticatedGuard)
  @Get('')
  async getUsers(): Promise<User[]> {
    const users = await this.usersService.getUsers();
    console.log(users);
    return users;
  }

  //  @UseInterceptors(ClassSerializerInterceptor)
  @Get('username/:userName')
  async getByUserName(@Param('userName') username: string) {
    const user = await this.usersService.getUsersByUserName(username);
    console.log(user._id);
    // if (user) return new SerializedUser(user);
    if (user) return user;
    else throw new HttpException('User Not Found ', HttpStatus.BAD_REQUEST);
  }

  // @UseInterceptors(ClassSerializerInterceptor)
  @Get('id/:id')
  @UseFilters(HttpExceptionFilter)
  async getById(@Param('id') id: string): Promise<User> {
    const user = await this.usersService.getUserById(id);
    console.log(typeof user._id);
    // if (user) return new SerializedUser(user);
    if (user) return user;
    else {
      throw new UserNotFoundExeption();
    }
    // else throw new HttpException('User Not Found ', HttpStatus.BAD_REQUEST);
  }

  @Post('create')
  @UsePipes(ValidationPipe)
  createUser(@Body() dto: UserCreateDto) {
    return this.usersService.createUser(dto);
  }
}
