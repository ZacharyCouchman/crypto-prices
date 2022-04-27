import { Module, CacheModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CryptoPriceModule } from './CryptoPrices/crypto-price.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    CacheModule.register({ isGlobal: true }),
    CryptoPriceModule,
    MongooseModule.forRoot('mongodb://mongodb:27017', {
      dbName: 'cryptodb',
      user: 'admin',
      pass: 'password',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
