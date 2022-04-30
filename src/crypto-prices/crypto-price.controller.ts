import { Controller, Get } from '@nestjs/common';
import { CryptoPriceService } from './crypto-price.service';

@Controller('crypto-price')
export class CryptoPriceController {
  constructor(private crypto: CryptoPriceService) {}

  @Get('')
  getCryptoPrices() {
    return this.crypto.getPrices();
  }
}
