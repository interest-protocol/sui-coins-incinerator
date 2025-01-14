export const MAX_NUMBER_INPUT_VALUE = 9000000000000000;

export const LOCAL_STORAGE_VERSION = 'v2';

export const PAGE_SIZE = 50;

export enum Network {
  MAINNET = 'sui:mainnet',
  TESTNET = 'sui:testnet',
}

export const DISPLAY_NETWORK = {
  [Network.MAINNET]: 'Mainnet',
  [Network.TESTNET]: 'Testnet',
};

export const INDEXER_URL = 'https://api.indexer.xyz/graphql';

export const TREASURY =
  '0xdd224f2287f0b38693555c6077abe85fcb4aa13e355ad54bc167611896b007e6';

export const TOAST_DURATION = 10000;

export const SPONSOR_WALLET = {
  [Network.MAINNET]:
    '0x2bbb58d6300439abfcc9ad13dd12b04e6ea6fce1c3604de7507a0a39d8573b19',
  [Network.TESTNET]:
    '0x5e7197d38ea9d838835462dadc447770cde842537cfb528f6b36478f4c968164',
};
