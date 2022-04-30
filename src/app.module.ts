import { Module, CacheModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CryptoPriceModule } from './crypto-prices/crypto-price.module';

@Module({
  imports: [CacheModule.register({ isGlobal: true }), CryptoPriceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
