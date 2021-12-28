import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Req,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { cretaeCustomerDto } from 'src/customers/dto/CreateCustomerDto';
import { CustomersService } from 'src/customers/services/customers/customers.service';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}
  @Get(':id')
  getCustomer(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const customer = this.customersService.fidnCustomerById(id);
    if (customer) {
      res.send(customer);
    } else {
      res.status(400).send({ msg: 'Customer not found' });
    }
  }

  @Get('search/:id')
  searchtCustomerById(@Param('id', ParseIntPipe) id: number) {
    const customer = this.customersService.fidnCustomerById(id);
    console.log(customer);
    if (customer) {
      return customer;
    } else {
      throw new HttpException('Customer not found', HttpStatus.BAD_REQUEST);
    }
  }

  @Post('create')
  @UsePipes(ValidationPipe)
  cretaeCustomer(@Body() customer: cretaeCustomerDto) {
    return this.customersService.createCustomer(customer);
  }

  @Get('')
  getAllCustomers() {
    return this.customersService.allCustomers();
  }
}
