// src/commerce/commerce.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Commerce, CommerceDocument } from './commerce.model';
import { CreateCommerceDto, SearchCommerceDto, UpdateCommerceDto } from './commerce.dto';

@Injectable()
export class CommerceService {
    constructor(@InjectModel(Commerce.name) private commerceModel: Model<CommerceDocument>) { }

    async findAllWithPagination(skip: number, limit: number): Promise<[Commerce[], number]> {
        const commerces = await this.commerceModel.find()
            .skip(skip)
            .limit(limit)
            .exec();

        const total = await this.commerceModel.countDocuments().exec();

        return [commerces, total];
    }

    async findByName(searchDto: SearchCommerceDto) {
        const { nombre } = searchDto;
        const regex = new RegExp(nombre, 'i'); // Búsqueda insensible a mayúsculas y minúsculas
    
        const matchingCommerces = await this.commerceModel.find({ nombre: regex }).exec();
    
        return matchingCommerces;
      }

    async create(createCommerceDto: CreateCommerceDto) {
        const newCommerce = new this.commerceModel(createCommerceDto);
        return newCommerce.save();
    }

    async findAll() {
        return this.commerceModel.find().exec();
    }

    async findOne(id: string) {
        return this.commerceModel.findById(id).exec();
    }

    async update(id: string, updateCommerceDto: UpdateCommerceDto) {
        return this.commerceModel.findByIdAndUpdate(id, updateCommerceDto, { new: true }).exec();
    }

    async remove(id: string) {
        return this.commerceModel.findByIdAndRemove(id).exec();
    }
}
