export const COIN_GECKO_URL =
  'https://api.coingecko.com/api/v3/simple/price?ids=immutable-x%2Cethereum%2Cgods-unchained%2Cguild-of-guardians%2Cusd-coin%2Cecomi&vs_currencies=usd';

export const CoinGeckoKeys = {
  ETH: 'ethereum',
  IMX: 'immutable-x',
  GODS: 'gods-unchained',
  GOG: 'guild-of-guardians',
  USDC: 'usd-coin',
  OMI: 'ecomi',
};

export const CACHE_TTL_SECONDS = 600;

// Constants for Prices from Chainlink Price Feeds
// Chainlink doesn't provide price feeds for all the currencies we want

// Infura URLs
export const KOVAN_INFURA_URL =
  'https://kovan.infura.io/v3/{insert-infura-key}';
export const MAINNET_INFURA_URL =
  'https://mainnet.infura.io/v3/{insert-infura-key}';

// Price Data Feed Contract Addresses

// KOVAN NETWORK
export const KOVAN_ETH_USD_CONTRACT =
  '0x9326BFA02ADD2366b30bacB125260Af641031331';

// MAINNET NETWORK
export const MAINNET_ETH_USD_CONTRACT =
  '0x5f4ec3df9cbd43714fe2740f5e3616155c5b8419';
export const MAINNET_USDC_USD_CONTRACT =
  '0x986b5e1e1755e3c2440e960477f25201b0a8bbd4';
export const MAINNET_IMX_USD_CONTRACT =
  '0xbaebefc1d023c0feccc047bff42e75f15ff213e6';

// ChainLink Price Data feed v3 interface ABI (could use an array of strings of the solidity functions with ethers.js)
export const aggregatorV3InterfaceABI = [
  {
    inputs: [],
    name: 'decimals',
    outputs: [{ internalType: 'uint8', name: '', type: 'uint8' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'description',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint80', name: '_roundId', type: 'uint80' }],
    name: 'getRoundData',
    outputs: [
      { internalType: 'uint80', name: 'roundId', type: 'uint80' },
      { internalType: 'int256', name: 'answer', type: 'int256' },
      { internalType: 'uint256', name: 'startedAt', type: 'uint256' },
      { internalType: 'uint256', name: 'updatedAt', type: 'uint256' },
      { internalType: 'uint80', name: 'answeredInRound', type: 'uint80' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'latestRoundData',
    outputs: [
      { internalType: 'uint80', name: 'roundId', type: 'uint80' },
      { internalType: 'int256', name: 'answer', type: 'int256' },
      { internalType: 'uint256', name: 'startedAt', type: 'uint256' },
      { internalType: 'uint256', name: 'updatedAt', type: 'uint256' },
      { internalType: 'uint80', name: 'answeredInRound', type: 'uint80' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'version',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
];
