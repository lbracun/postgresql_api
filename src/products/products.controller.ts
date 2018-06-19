import { Controller, Get, Post, Put, Delete, Body, Param, HttpCode } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './product.entity';

@Controller()
export class ProductsController {
    constructor(private readonly productsService: ProductsService) { }

    @Get('products')
    async findAll(): Promise<Product[]> {
        return this.productsService.findAll();
    }

    @Post('product')
    @HttpCode(201)
    async create(@Body() product: Product): Promise<Product> {
        return this.productsService.create(product);
    }

    @Get('product/:id')
    async findOne(@Param('id') id): Promise<Product> {
        return this.productsService.findOne(id);
    }

    @Delete('product/:id')
    @HttpCode(204)
    async removeOne(@Param('id') id): Promise<Product> {
        return this.productsService.removeOne(id);
    }

    @Put('product/:id')
    async updateOne(@Param('id') id, @Body() product: Product): Promise<Product> {
        return this.productsService.updateOne(id, product);
    }
}
