import { Module } from '@nestjs/common';
import { databaseConfig } from './config/mongoose';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { CommerceService } from './commerce/commerce.service';
import { CommerceController } from './commerce/commerce.controller';
import { PassportModule } from '@nestjs/passport';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './users/user.model';
import { Commerce, CommerceSchema } from './commerce/commerce.model';
import { Product, ProductSchema } from './products/product.model';
import { Price, PriceSchema } from './prices/price.model';
import { ProductsService } from './products/products.service';
import { ProductController } from './products/products.controller';
import { PricesService } from './prices/prices.service';
import { PricesController } from './prices/prices.controller';

@Module({
  imports: [databaseConfig, PassportModule.register({ defaultStrategy: 'local' }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Commerce.name, schema: CommerceSchema }]),
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    MongooseModule.forFeature([{ name: Price.name, schema: PriceSchema }]),
  ],
  controllers: [UsersController, CommerceController, ProductController, PricesController],
  providers: [ UsersService, CommerceService, ProductsService, PricesService],
})
export class AppModule {}
