import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>
    ) { }

    async create(product: Product): Promise<Product> {
        product.dateCreated = new Date().toString();
        try {
            return await this.productRepository.save(product);
        }
        catch (err) {
            throw new HttpException('All fields are required', HttpStatus.BAD_REQUEST);
        }

    }

    async findAll(): Promise<Product[]> {
        return await this.productRepository.find();
    }

    async findOne(id: number): Promise<Product> {
        const product = await this.productRepository.findOne(id);
        if (!product) throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
        return product;
    }

    async removeOne(id: number): Promise<Product> {
        const productToRemove = await this.productRepository.findOne(id);
        if (!productToRemove) throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
        return await this.productRepository.remove(productToRemove);
    }

    async updateOne(id: number, product: Product): Promise<Product> {
        product.id = id;
        try {
            return await this.productRepository.save(product);
        }
        catch (err) {
            throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
        }
    }
}
