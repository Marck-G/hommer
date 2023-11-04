// barcode.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Barcode, BarcodeDocument } from './barcode.model';
import { CreateBarcodeDto, UpdateBarcodeDto } from './barcode.dto';

@Injectable()
export class BarcodeService {
  constructor(@InjectModel(Barcode.name) private barcodeModel: Model<BarcodeDocument>) {}

  async listByProduct(product: string) {
    return this.barcodeModel.find({ producto: product }).exec();
  }

  async create(createBarcodeDto: CreateBarcodeDto) {
    const newBarcode = new this.barcodeModel(createBarcodeDto);
    return newBarcode.save();
  }

  async update(id: string, updateBarcodeDto: UpdateBarcodeDto) {
    return this.barcodeModel.findByIdAndUpdate(id, updateBarcodeDto, { new: true }).exec();
  }

  async remove(id: string) {
    return this.barcodeModel.findOneAndDelete({_id: id}).exec();
  }
}
