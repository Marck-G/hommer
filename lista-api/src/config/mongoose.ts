import {MongooseModule} from '@nestjs/mongoose'

const url = "mongodb://192.168.1.11:23013/lista-compra";
export const databaseConfig = MongooseModule.forRoot(url,{
    user: "backend",
    pass: "backend",
    autoIndex: true
})