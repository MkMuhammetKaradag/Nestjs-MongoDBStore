import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/user.schema';
import { UsersController } from './controlers/users/users.controller';
import { UsersService } from './services/users/users.service';
import * as bcrypt from 'bcrypt';
@Module({
  imports: [
    MongooseModule.forFeature(
      [
        {
          name: User.name,
          schema: UserSchema,
          // useFactory: () => {
          //   const schema = UserSchema;
          //   schema.pre('save', async function (done) {
          //     if (this.isModified('password')) {
          //       // const saltOrRounds = 10;
          //       // const password_key = 'random_password';
          //       const salt = await bcrypt.genSalt();
          //       const password = await bcrypt.hash(this.get('password'), salt);
          //       this.set('password', password);
          //     }
          //     done();
          //   });
          //   return schema;
          // },
        },
      ],
      'nestEgitim',
    ),
  ],
  controllers: [UsersController],
  providers: [
    {
      provide: 'USER_SERVICE',
      useClass: UsersService,
    },
  ],
})
export class UsersModule {}
