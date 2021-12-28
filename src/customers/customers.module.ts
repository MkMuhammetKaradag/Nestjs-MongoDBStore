import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { CustomersController } from './controllers/customers/customers.controller';
import { ValidateCustomerAccountMiddleware } from './middleware/validate-customer-account.middleware';
import { ValidateCustomerMiddleware } from './middleware/validate-customer.middleware';
import { CustomersService } from './services/customers/customers.service';

@Module({
  controllers: [CustomersController],
  providers: [CustomersService],
})
export class CustomersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        ValidateCustomerMiddleware,
        ValidateCustomerAccountMiddleware,
        (req: Request, res: Response, next: NextFunction) => {
          console.log('last middleware');
          next();
        },
      )
      .exclude({
        path: 'customers/create',
        method: RequestMethod.ALL,
      })
      .forRoutes(
        // {
        //   path: 'customers/search/:id',
        //   method: RequestMethod.GET,
        // },
        // {
        //   path: 'customers/:id',
        //   method: RequestMethod.GET,
        // },
        CustomersController,
      );
  }
}
