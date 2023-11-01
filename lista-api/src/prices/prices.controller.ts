// price.controller.ts
import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
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
  findAll() {
    return this.priceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.priceService.findOne(id);
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
