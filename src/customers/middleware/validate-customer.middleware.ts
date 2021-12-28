import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { nextTick } from 'process';

@Injectable()
export class ValidateCustomerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('hello ValidateCustomerMiddleware');

    const { authorization } = req.headers;
    if (!authorization) {
      return res
        .status(403)
        .send({ message: 'No Authentication Token  Provider ' });
    }
    if (authorization == '123') {
      next();
    } else {
      return res
        .status(403)
        .send({ message: 'invalide   Authentication Token  Provider ' });
    }
  }
}
