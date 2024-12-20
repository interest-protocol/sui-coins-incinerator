import { ObjectData } from '@/components/web3-manager/all-objects-manager/all-objects.types';
import {
  CoinObject,
  CoinsMap,
} from '@/components/web3-manager/coins-manager/coins-manager.types';
import { FixedPointMath } from '@/lib';

import { ObjectField } from './incinerator.types';

const getKindFromObjectData = (object: ObjectData) => {
  if (object?.display?.type) return 'Coin';
  if (object?.display) return 'NFT';
  return 'Other';
};

export const objectDataToObjectField = (
  objects: ReadonlyArray<ObjectData>,
  coinsMap: CoinsMap,
  checked = true
) =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  objects.reduce((acc: ReadonlyArray<ObjectField>, object: any) => {
    const coin = coinsMap[(object.display as CoinObject)?.type];
    const editable = coin && coin.balance && !coin.balance.isZero();

    return [
      ...acc,
      {
        ...object,
        editable,
        active: checked,
        isEditing: false,
        index: acc.length,
        kind: getKindFromObjectData(object),
        value: coin
          ? `${FixedPointMath.toNumber(coin.balance, coin.decimals)}`
          : '1',
      },
    ];
  }, [] as ReadonlyArray<ObjectField>);
