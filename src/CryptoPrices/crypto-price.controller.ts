import { Controller, Get, Post } from '@nestjs/common';
import { CryptoPriceService } from './crypto-price.service';

@Controller('crypto-price')
export class CryptoPriceController {
  constructor(private crypto: CryptoPriceService) {}

  @Get('')
  async getCryptoPrices(): Promise<string> {
    const cryptoPrice = await this.crypto.getCryptoPrices();
    return 'Crypto price: ' + cryptoPrice;
  }

  @Get('mongo')
  async getCryptoPricesFromMongo(): Promise<string> {
    const cryptoPrice = await this.crypto.getCryptoPricesFromMongo();
    return 'Crypto price: ' + cryptoPrice;
  }

  @Post('load')
  async loadCryptoPrices(): Promise<string> {
    return await this.crypto.loadCryptoPricesIntoCacheAndMongo();
  }
}
