// product.controller.ts
import { Controller, Get, Post, Patch, Delete, Body, Param, Query, Logger } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './product.model';
import { CreateProductDto, UpdateProductDto } from './product.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    Logger.log(createProductDto)
    const result = await this.productsService.create(createProductDto);
    Logger.log(result)
    return result
  }

  @Get()
  async findAll(@Query('page') page = 1, @Query('limit') limit = 10000) {
    const skip = (page - 1) * limit;
        const [products, total] = await this.productsService.findAllWithPagination(skip, limit);

        return {
            page: page,
            limit: limit,
            total: total,
            data: products,
        };
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    new Logger().log(updateProductDto);
    const data = await this.productsService.update(id, updateProductDto);
    Logger.log(data);
    return data;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
