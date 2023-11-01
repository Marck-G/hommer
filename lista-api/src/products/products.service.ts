// product.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './product.model';
import { CreateProductDto, UpdateProductDto } from './product.dto';

@Injectable()
export class ProductsService {
  constructor(@InjectModel(Product.name) private productModel: Model<ProductDocument>) {}

  async create(createProductDto: CreateProductDto) {
    const newProduct = new this.productModel(createProductDto);
    return newProduct.save();
  }

  async findAll() {
    return this.productModel.find().exec();
  }

  async findOne(id: string) {
    return this.productModel.findById(id).exec();
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    return this.productModel.findByIdAndUpdate(id, updateProductDto, { new: true }).exec();
  }

  async remove(id: string) {
    return this.productModel.findByIdAndRemove(id).exec();
  }
}
