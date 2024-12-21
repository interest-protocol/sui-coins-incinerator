import { Network } from '@/constants';
import { CoinMetadataWithType } from '@/interface';

import { isSameStructTag } from './tag';
import {
  FetchCoinMetadata,
  FetchCoinMetadataMultipleTypeArg,
  FetchCoinMetadataSingleTypeArg,
} from './types';

const isSingleType = (
  args: FetchCoinMetadataSingleTypeArg | FetchCoinMetadataMultipleTypeArg
): args is FetchCoinMetadataSingleTypeArg =>
  !!(args as FetchCoinMetadataSingleTypeArg).type;

const metadatas: Record<string, CoinMetadataWithType> = {};

export const fetchCoinMetadata: FetchCoinMetadata = async (args) => {
  if (isSingleType(args)) {
    if (metadatas[args.type]) return metadatas[args.type];

    return await fetch(
      `https://coin-metadata-api-${Network.MAINNET === args.network ? '' : 'testnet-'}production.up.railway.app/api/v1/fetch-coins/${encodeURI(args.type)}`,
      {
        headers: {
          network: 'sui',
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        metadatas[args.type] = data;
        return data;
      })
      .catch();
  }

  const uniqueTypes = Array.from(new Set(args.types));

  const cachedMetadatas = uniqueTypes.reduce((acc, type) => {
    const metadata = metadatas[type];
    if (!metadata) return acc;
    return [...acc, metadata];
  }, [] as ReadonlyArray<CoinMetadataWithType>);

  const missingTypes = uniqueTypes.filter(
    (type) => !cachedMetadatas.some((meta) => isSameStructTag(meta.type, type))
  );

  if (!missingTypes.length) return cachedMetadatas;

  const missingMetadatas = await fetch(
    `https://coin-metadata-api-${Network.MAINNET === args.network ? '' : 'testnet-'}production.up.railway.app/api/v1/fetch-coins?coinTypes=${missingTypes}`,
    {
      headers: {
        network: 'sui',
      },
    }
  )
    .then((res) => res.json())
    .then((data) => {
      data.forEach(
        (metadata: CoinMetadataWithType) =>
          (metadatas[metadata.type] = metadata)
      );

      return data;
    });

  return [...cachedMetadatas, ...missingMetadatas];
};
