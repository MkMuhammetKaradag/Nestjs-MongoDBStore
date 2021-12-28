import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateAdrressDto {
  @IsNotEmpty()
  line1: string;

  @IsOptional()
  line2?: string;

  @IsNotEmpty()
  zip: string;

  @IsNotEmpty()
  city: string;

  @IsNotEmpty()
  state: string;
}
