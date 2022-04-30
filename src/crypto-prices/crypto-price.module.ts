import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { CryptoPriceController } from './crypto-price.controller';
import { CryptoPriceService } from './crypto-price.service';

@Module({
  imports: [
    HttpModule,
    // MongooseModule.forFeature([{ name: Crypto.name, schema: CryptoSchema }]),
  ],
  controllers: [CryptoPriceController],
  providers: [CryptoPriceService],
})
export class CryptoPriceModule {}
