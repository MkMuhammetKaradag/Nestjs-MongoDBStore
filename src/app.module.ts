import { Module } from '@nestjs/common';
import { CustomersModule } from './customers/customers.module';
import { UsersModule } from './users/users.module';
import { MongoDbModule } from './mongo-db/mongo-db.module';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { PaymentsModule } from './payments/payments.module';

@Module({
  imports: [
    CustomersModule,
    UsersModule,
    MongoDbModule,
    AuthModule,
    PassportModule.register({
      session: true,
    }),
    PaymentsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
