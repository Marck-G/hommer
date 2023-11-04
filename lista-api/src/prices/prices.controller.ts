// price.controller.ts
import { Controller, Get, Post, Patch, Delete, Body, Param, Query, Logger } from '@nestjs/common';
import { PricesService } from './prices.service';
import { Price } from './price.model';
import { CreatePriceDto, UpdatePriceDto } from './price.dto';

@Controller('prices')
export class PricesController {
  constructor(private readonly priceService: PricesService) {}

  @Post()
  create(@Body() createPriceDto: CreatePriceDto) {
    return this.priceService.create(createPriceDto);
  }

  @Get()
  async findAll(@Query('page') page = 1, @Query('limit') limit = 10) {
    const skip = (page - 1) * limit;
        const [products, total] = await this.priceService.findAllWithPagination(skip, limit);

        return {
            page: page,
            limit: limit,
            total: total,
            data: products,
        };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.priceService.findOne(id);
  }

  @Get("product/:product")
  getProductPrice(@Param('product') productId : string){
    return this.priceService.getPriceForProduct(productId);
  }

  @Get("list/:product")
  getProductPrices(@Param('product') productId : string){
    return this.priceService.getPricesForProduct(productId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePriceDto: UpdatePriceDto) {
    return this.priceService.update(id, updatePriceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.priceService.remove(id);
  }
}
