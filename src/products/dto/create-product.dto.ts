import { IsNotEmpty, IsString, IsInt, IsNumber } from 'class-validator';

export class CreateProductDTO {
  @IsNotEmpty()
  @IsString()
  readonly name: string;
  @IsNotEmpty()
  @IsInt()
  readonly qty: number;
  @IsNotEmpty()
  @IsNumber()
  readonly price: number;
}
