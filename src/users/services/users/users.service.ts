import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { plainToClass } from 'class-transformer';
import { Model } from 'mongoose';
import { User, UserDocument } from '../../../schemas/user.schema';
import { UserCreateDto } from '../../dto/create-User.dto';
import { encodePassword } from '../../../utils/bcryp';
// import { SerializedUser } from 'src/users/types';

@Injectable()
export class UsersService {
  // private users: User[] = [
  //   { userName: 'Mami', password: 'test.test', id: 1 },
  //   { userName: 'Mami-1', password: 'test.test-1', id: 2 },
  //   { userName: 'Mami-2', password: 'test.test-2', id: 3 },
  // ];

  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}
  async getUsers(): Promise<User[]> {
    // return this.users.map((user) => plainToClass(SerializedUser, user));
    const users = await this.userModel.find().lean().exec();
    console.log(typeof users);
    return users;
  }
  async getUsersByUserName(userName: string) {
    const user = await this.userModel.findOne({ userName });
    return user;
  }

  async getUserById(id: string) {
    return await this.userModel.findById(id).lean();
  }

  async createUser(dto: UserCreateDto) {
    const password = encodePassword(dto.password);
    console.log(password);
    const newUser = new this.userModel({ ...dto, password });

    return newUser.save();
  }

  async findUser(email: string): Promise<User> {
    //console.log(userName);
    return await this.userModel.findOne({ email });
  }
  async findUserById(id: string) {
    return await this.userModel.findById(id).lean();
  }
}
