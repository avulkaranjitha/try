import {
  Controller,
  Post,
  Get,
  HttpCode,
  Header,
  Redirect,
  Query,
  Param,
  Body,
  Delete,
  HttpException,
  HttpStatus,
  ForbiddenException,
  NotFoundException,
  UseFilters,
  UseInterceptors,
  Put,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDTO } from './dto/create-product.dto';
import { Product } from './interfaces/product.interface';
import { HttpExceptionFilter } from '../common/filters/http-exception.filter';
import { TransformInterceptor } from '../common/interceptors/transform.interceptor';
import { DeleteResult, UpdateResult } from 'typeorm';
import { UpdateProductDTO } from './dto/update-product.dto';

@Controller('products')
@UseFilters(HttpExceptionFilter)
@UseInterceptors(TransformInterceptor)
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Post()
  async create(@Body() product: CreateProductDTO): Promise<Product> {
    console.log(product);
    return await this.productService.create(product);
  }

  @Get()
  async find(): Promise<Product[]> {
    return await this.productService.findAll();
  }
  @Get(':id')
  async findOne(@Param('id') id): Promise<Product> {
    return await this.productService.findOne(+id);
  }
  @Delete(':id')
  async delete(@Param('id') id): Promise<DeleteResult> {
    return await this.productService.delete(+id);
  }

  @Put(':id')
  async update(
    @Param('id') id,
    @Body() recordToUpdate: UpdateProductDTO,
  ): Promise<Product> {
    return await this.productService.update(+id, recordToUpdate);
  }
  
}
