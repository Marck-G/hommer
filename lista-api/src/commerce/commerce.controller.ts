// src/commerce/commerce.controller.ts
import { Controller, Get, Post, Patch, Delete, Body, Param, Query, Logger } from '@nestjs/common';
import { CommerceService } from './commerce.service';
import { CreateCommerceDto, SearchCommerceDto, UpdateCommerceDto } from './commerce.dto';
import { QueryService } from '@nestjs-query/core';
import { PaginationDto } from 'src/common/pagination.dto';
import { Commerce } from './commerce.model';

@Controller('commerce')
export class CommerceController {
    constructor(private readonly commerceService: CommerceService) { }

    @Get()
    async findAll(@Query('page') page = 1, @Query('limit') limit = 1000) {
        const skip = (page - 1) * limit;
        const [commerces, total] = await this.commerceService.findAllWithPagination(skip, limit);

        return {
            page: page,
            limit: limit,
            total: total,
            data: commerces,
        };
    }

    @Get('search')
    async searchByName(@Query("q") searchDto: SearchCommerceDto) {
        const matchingCommerces = await this.commerceService.findByName(searchDto);
        return matchingCommerces;
    }

    @Post()
    create(@Body() createCommerceDto: CreateCommerceDto) {
        Logger.log(createCommerceDto)
        return this.commerceService.create(createCommerceDto);
    }


    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.commerceService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateCommerceDto: UpdateCommerceDto) {
        return this.commerceService.update(id, updateCommerceDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.commerceService.remove(id);
    }
}
