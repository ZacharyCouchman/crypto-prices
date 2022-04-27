import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CryptoPriceController } from './crypto-price.controller';
import { CryptoPriceService } from './crypto-price.service';
import { CryptoSchema, Crypto } from './crypto.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Crypto.name, schema: CryptoSchema }]),
  ],
  controllers: [CryptoPriceController],
  providers: [CryptoPriceService],
})
export class CryptoPriceModule {}
