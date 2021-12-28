import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { nextTick } from 'process';

@Injectable()
export class ValidateCustomerAccountMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('hello ValidateCustomerAccountMiddleware');
    const { valid } = req.headers;

    if (valid === 'false') {
      return res.status(403).send({ message: 'Accoun is İNvalide' });
    } else {
      next();
    }
  }
}
