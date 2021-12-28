import { IsEmail, IsEmpty, IsInt, IsNotEmpty } from 'class-validator';

export class CreatePaymentDto {
  @IsEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsInt()
  price: number;
}
