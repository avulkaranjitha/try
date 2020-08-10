import { Injectable, NotFoundException } from '@nestjs/common';
import { Product, UpdateProduct } from './interfaces/product.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult, UpdateResult } from 'typeorm';
import { ProductEntity } from './product.entity';
import { CreateProductDTO } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}
  async create(product: CreateProductDTO): Promise<Product> {
    return await this.productRepository.save(product);
  }
  async findAll(): Promise<Product[]> {
    return await this.productRepository.find();
  }
  async findOne(id: number): Promise<Product> {
    const results = await this.productRepository.findOne(id);
    if (!results) {
      throw new NotFoundException('Could not find any product');
    }
    return results;
  }
  async delete(id: number): Promise<DeleteResult> {
    return await this.productRepository.delete(id);
  }

  async update(id: number, recordToUpdate: UpdateProduct): Promise<Product> {
    // return await this.productRepository.update(id, recordToUpdate);
    const product = await this.productRepository.findOne(id);
    if (!product) {
      throw new NotFoundException('Could not find any product');
    }
    // merge the product with recordToUpdate
    await this.productRepository.merge(product, recordToUpdate);
    return await this.productRepository.save(product);
  }
}
