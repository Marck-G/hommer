// product.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './product.model';
import { CreateProductDto, UpdateProductDto } from './product.dto';

@Injectable()
export class ProductsService {
  constructor(@InjectModel(Product.name) private productModel: Model<ProductDocument>) {}

  async findAllWithPagination(skip: number, limit: number): Promise<[Product[], number]> {
    const commerces = await this.productModel.find()
        .skip(skip)
        .limit(limit)
        .exec();

    const total = await this.productModel.countDocuments().exec();

    return [commerces, total];
}

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

  async findProductsWithLowestPrice() {
    const productsWithLowestPrice = await this.productModel.aggregate([
      {
        $lookup: {
          from: 'prices', // Nombre de la colección de precios en la base de datos
          localField: '_id',
          foreignField: 'producto',
          as: 'prices',
        },
      },
      {
        $unwind: '$prices',
      },
      {
        $group: {
          _id: '$_id',
          nombre: { $first: '$nombre' },
          descripcion: { $first: '$descripcion' },
          barcode: { $first: '$barcode' },
          quantity: { $first: '$quantity' },
          price: { $min: '$prices.precio' },
        },
      },
    ]).exec();

    return productsWithLowestPrice;
  }
}
