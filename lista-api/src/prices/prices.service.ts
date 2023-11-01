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

  async findAll() {
    return this.priceModel.find().exec();
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
