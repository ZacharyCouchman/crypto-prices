import { Injectable, Inject, CACHE_MANAGER } from '@nestjs/common';
import { CACHE_TTL_SECONDS, CoinGeckoKeys, COIN_GECKO_URL } from './constants';
import { Cache } from 'cache-manager';
import { HttpService } from '@nestjs/axios';
import { map, Observable, retry, RetryConfig } from 'rxjs';
import { CryptoPricesCacheItem } from './types';

@Injectable()
export class CryptoPriceService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private httpService: HttpService,
  ) {}

  async getPrices(): Promise<any | Observable<any>> {
    // If prices are already in the cache then return them
    const prices = await this.cacheManager.get('prices');
    if (prices) {
      return prices;
    }

    return this.httpService.get(COIN_GECKO_URL).pipe(
      retry({ count: 2, delay: 100 } as RetryConfig),
      map((response) => response.data),
      map((data) => {
        return {
          ETH: data[CoinGeckoKeys.ETH].usd,
          GODS: data[CoinGeckoKeys.GODS].usd,
          GOG: data[CoinGeckoKeys.GOG].usd,
          IMX: data[CoinGeckoKeys.IMX].usd,
          USDC: data[CoinGeckoKeys.USDC].usd,
          OMI: data[CoinGeckoKeys.OMI].usd,
        } as CryptoPricesCacheItem;
      }),
      map(async (mappedData) => {
        await this.cacheManager.set('prices', mappedData, {
          ttl: CACHE_TTL_SECONDS,
        });
        return mappedData;
      }),
    );
  }
}
