import { Injectable, Inject, CACHE_MANAGER } from '@nestjs/common';
import { BigNumber, ethers } from 'ethers';
import {
  aggregatorV3InterfaceABI,
  MAINNET_ETH_USD_CONTRACT,
  MAINNET_INFURA_URL,
} from './constants';
import { Cache } from 'cache-manager';
import { PriceFeedCacheItem } from './types';
import { InjectModel } from '@nestjs/mongoose';
import { Crypto, CryptoDocument } from './crypto.schema';
import { Model } from 'mongoose';

@Injectable()
export class CryptoPriceService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @InjectModel(Crypto.name) private cryptoModel: Model<CryptoDocument>,
  ) {}

  async loadCryptoPricesIntoCacheAndMongo(): Promise<any> {
    const provider = new ethers.providers.JsonRpcProvider(MAINNET_INFURA_URL);
    const addr = MAINNET_ETH_USD_CONTRACT;
    const priceFeed = new ethers.Contract(
      addr,
      aggregatorV3InterfaceABI,
      provider,
    );

    let decimals: number;
    let latestRoundData: any;
    let price: string;

    try {
      decimals = await priceFeed.decimals();
      latestRoundData = await priceFeed.latestRoundData();
      price = parseFloat(
        ethers.utils.formatUnits(
          BigNumber.from(latestRoundData.answer),
          decimals,
        ),
      ).toFixed(2); // could use currency formatter here for USD
      console.log('Latest Round Data', latestRoundData);
      console.log('ETH/USD price: ', price);
      console.log(
        'Updated at',
        latestRoundData.updatedAt.toBigInt().toString(),
      );
    } catch (exception) {
      console.error(exception);
      throw new Error('Failed to retrieve price data from Chainlink');
    }

    const ethUsdPrice = {
      label: 'ETH/USD',
      price,
      updatedAt: latestRoundData.updatedAt.toBigInt().toString(),
    } as PriceFeedCacheItem;
    console.log('caching item: ', ethUsdPrice);
    try {
      await this.cacheManager.set('eth-usd-price', ethUsdPrice, { ttl: 3600 });
      console.log('cached', await this.cacheManager.get('eth-usd-price'));
    } catch (ex) {
      console.error(ex);
    }

    try {
      const createdCrypto = new this.cryptoModel(ethUsdPrice);
      createdCrypto.save();
    } catch (ex) {
      console.error(ex);
    }

    return 'Successfully added to memory cache and mongodb';
  }

  async getCryptoPrices(): Promise<string> {
    const ethUsdPrice = await this.cacheManager.get<PriceFeedCacheItem>(
      'eth-usd-price',
    );
    console.log(ethUsdPrice);
    return ethUsdPrice.label + ' ' + ethUsdPrice.price;
  }

  async getCryptoPricesFromMongo(): Promise<string> {
    const ethUsdPrice = await this.cryptoModel.findOne().exec();
    console.log(ethUsdPrice);
    return ethUsdPrice.label + ' ' + ethUsdPrice.price;
  }
}
