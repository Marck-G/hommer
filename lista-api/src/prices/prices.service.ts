// price.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Price, PriceDocument } from './price.model';
import { CreatePriceDto, UpdatePriceDto } from './price.dto';

@Injectable()
export class PricesService {
  constructor(@InjectModel(Price.name) private priceModel: Model<PriceDocument>) {}

  async create(createPriceDto: CreatePriceDto) {
    const newPrice = new this.priceModel(createPriceDto);
    return newPrice.save();
  }

  async findAllWithPagination(skip: number, limit: number): Promise<[Price[], number]> {
    const commerces = await this.priceModel.find()
        .skip(skip)
        .limit(limit)
        .exec();

    const total = await this.priceModel.countDocuments().exec();

    return [commerces, total];
}

  async getPriceForProduct(productId: string){
    const lowestPrice = await this.priceModel.find({producto: productId})
    .sort({precio: 1})
    .limit(1)
    .exec();
    if (lowestPrice && lowestPrice.length > 0) {
      return lowestPrice[0].precio;
    } else {
      return null; // No se encontraron precios para el producto
    }
  }

  async getPricesForProduct(productId: string){
    const lowestPrice = await this.priceModel.find({producto: productId})
    .sort({fecha: 1})
    .exec();
    if (lowestPrice && lowestPrice.length > 0) {
      return lowestPrice;
    } else {
      return null; // No se encontraron precios para el producto
    }
  }

  async findOne(id: string) {
    return this.priceModel.findById(id).exec();
  }

  async update(id: string, updatePriceDto: UpdatePriceDto) {
    return this.priceModel.findByIdAndUpdate(id, updatePriceDto, { new: true }).exec();
  }

  async remove(id: string) {
    return this.priceModel.findByIdAndRemove(id).exec();
  }
}
