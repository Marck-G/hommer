// src/users/users.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.model';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import * as jwt from 'jsonwebtoken';
import {createHash} from 'crypto'
import { create } from 'domain';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async register(createUserDto: CreateUserDto) {
    // Aplicar hash SHA-256 a la contraseña y guardarla como hexadecimal
    const passwordHash = createHash('sha256').update(createUserDto.password).digest('hex');
    createUserDto.password = passwordHash;

    const newUser = new this.userModel(createUserDto);
    return newUser.save();
  }

  async login(email: string, password: string) {
    const user = await this.userModel.findOne({ email }).exec();
    if (!user) {
      return null; // Usuario no encontrado
    }

    // Aplicar hash SHA-256 a la contraseña ingresada y compararla con la almacenada
    const passwordHash = createHash('sha256').update(password).digest('hex');
    if (passwordHash !== user.password) {
      return null; // Contraseña incorrecta
    }

    const payload = { sub: user._id, email: user.email };
    const token = jwt.sign(payload, 'tu_secreto', { expiresIn: '30d' });
    return token;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true }).exec();
  }
}
