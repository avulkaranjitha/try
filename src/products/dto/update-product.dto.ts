import { IsString, IsInt, IsNumber, IsOptional } from 'class-validator';

export class UpdateProductDTO {
  @IsOptional()
  @IsString()
  readonly name: string;
  @IsOptional()
  @IsInt()
  readonly qty: number;
  @IsOptional()
  @IsNumber()
  readonly price: number;
}
