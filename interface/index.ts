import { CoinMetadata, SuiTransactionBlockResponse } from '@mysten/sui/client';
import BigNumber from 'bignumber.js';

export interface CoinMetadataWithType extends CoinMetadata {
  type: `0x${string}`;
}

export type BigNumberish = BigNumber | bigint | string | number;

export interface TimedSuiTransactionBlockResponse
  extends SuiTransactionBlockResponse {
  time: number;
}
