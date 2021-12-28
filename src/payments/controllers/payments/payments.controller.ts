// import { CreatePaymentDto } from 'src/payments/dto/CreatePayment.dto';
import { Body, Controller, Get, Inject, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { CreatePaymentDto } from '../../dto/CreatePayment.dto';
import { PaymentsService } from '../../services/payments/payments.service';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}
  @Get()
  getPayments(@Req() request: Request, @Res() response: Response) {
    const { count, page } = request.query;
    if (!count && !page) {
      response.status(400).send({ mesg: 'Missing count or page  parameter' });
    } else {
      response.send(200);
    }
  }

  @Post('create')
  async createPayment(@Body() dto: CreatePaymentDto) {
    const response = await this.paymentsService.createPayment(dto);
    return response;
  }
}
