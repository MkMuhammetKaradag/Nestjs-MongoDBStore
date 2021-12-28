import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { User, UserDocument } from '../../../schemas/user.schema';
import { UsersService } from './users.service';
import * as bcryptUtils from '../../../utils/bcryp';
const user = {
  name: 'Mami-User',
  email: 'test-user@test.com',
  password: '123456',
};
class UserModel {
  constructor(private data) {}
  save = jest.fn().mockResolvedValue(this.data);
  static find = jest.fn().mockResolvedValue([user]);
  static findOne = jest.fn().mockResolvedValue(user);
  static findOneAndUpdate = jest.fn().mockResolvedValue(user);
  static deleteOne = jest.fn().mockResolvedValue(true);
}
describe('UsersService', () => {
  let service: UsersService;
  //let userModel: Model<UserDocument>;
  const USER_MODEL_TOKEN = getModelToken(User.name);
  //console.log(USER_MODEL_TOKEN);
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: USER_MODEL_TOKEN,
          useValue: UserModel,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    //userModel = module.get<Model<UserDocument>>(USER_MODEL_TOKEN);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  // it('USER MODEL  should be defined', () => {
  //   expect(userModel).toBeDefined();
  // });

  describe('createUser', () => {
    jest.spyOn(bcryptUtils, 'encodePassword').mockReturnValue('hashed123');
    it('should  encoded  password correctly', async () => {
      const newuser = await service.createUser({
        userName: 'Mami-test',
        email: 'test-test@test.',
        password: '1234567',
      });
      //console.log(newuser);
      expect(bcryptUtils.encodePassword).toHaveBeenCalledWith('1234567');
    });
  });
});
