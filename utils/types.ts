import { useSignTransaction } from '@mysten/dapp-kit';
import {
  SuiClient,
  SuiTransactionBlockResponseOptions,
} from '@mysten/sui/client';
import { Transaction } from '@mysten/sui/transactions';
import { WalletAccount } from '@wallet-standard/base';

import { Network } from '@/constants';
import { CoinMetadataWithType } from '@/interface';

export interface SignAndExecuteArgs {
  suiClient: SuiClient;
  currentAccount: WalletAccount;
  tx: Transaction;
  signTransaction: ReturnType<typeof useSignTransaction>;
  options?: SuiTransactionBlockResponseOptions;
}

export interface WaitForTxArgs {
  suiClient: SuiClient;
  digest: string;
  timeout?: number;
  pollInterval?: number;
}

interface FetchCoinMetadataBaseArgs {
  network: Network;
}

export interface FetchCoinMetadataSingleTypeArg
  extends FetchCoinMetadataBaseArgs {
  type: string;
}

export interface FetchCoinMetadataMultipleTypeArg
  extends FetchCoinMetadataBaseArgs {
  types: ReadonlyArray<string>;
}

export interface FetchCoinMetadata {
  (args: FetchCoinMetadataSingleTypeArg): Promise<CoinMetadataWithType>;
  (
    args: FetchCoinMetadataMultipleTypeArg
  ): Promise<ReadonlyArray<CoinMetadataWithType>>;
}

export interface GetCoinsArgs {
  suiClient: SuiClient;
  account: string;
  coinType: string;
  cursor?: string | null;
}
