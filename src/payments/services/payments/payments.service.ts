import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePaymentDto } from '../../dto/CreatePayment.dto';

@Injectable()
export class PaymentsService {
  private users = [
    {
      email: 'test@test.com',
    },
    {
      email: 'test1@test.com',
    },
  ];

  async createPayment(dto: CreatePaymentDto) {
    const { email } = dto;
    const user = this.users.find((user) => user.email === email);

    if (user) {
      return {
        status: 'success',
      };
    } else {
      throw new BadRequestException();
    }
  }
}
