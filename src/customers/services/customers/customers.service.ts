import { Injectable } from '@nestjs/common';
import { cretaeCustomerDto } from 'src/customers/dto/CreateCustomerDto';
import { Customer } from 'src/customers/types/Customers';

@Injectable()
export class CustomersService {
  private customers: Customer[] = [
    {
      email: 'test-1@test.com',
      name: 'Mami',
      id: 2,
    },
    {
      email: 'test@test.com',
      name: 'Mami-1',
      id: 1,
    },
    {
      email: 'test-2@test.com',
      name: 'Mami-2',
      id: 3,
    },
  ];

  allCustomers(): Customer[] {
    return this.customers;
  }
  fidnCustomerById(id: number): Customer {
    return this.customers.find((user) => user.id === id);
  }

  createCustomer(customerDto: cretaeCustomerDto) {
    this.customers.push(customerDto);
  }
}
