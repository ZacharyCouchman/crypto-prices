import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getMessage(): string {
    return 'Crypto prices POC. Go to /crypto-price to get prices';
  }
}
