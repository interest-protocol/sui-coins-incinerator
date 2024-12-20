import BigNumber from 'bignumber.js';

import { BigNumberish } from '@/interface';
import { FixedPointMath } from '@/lib';

function isHexString(value: unknown, length?: number): boolean {
  if (typeof value !== 'string' || !value.match(/^0x[0-9A-Fa-f]*$/))
    return false;

  if (length && value.length !== 2 + 2 * length) return false;

  return true;
}

export const parseBigNumberish = (x: unknown): BigNumber =>
  isBigNumberish(x) ? new BigNumber(x.toString()) : ZERO_BIG_NUMBER;

export const parseToPositiveStringNumber = (x: string): string => {
  if (isNaN(+x)) return '0';
  if (0 > +x) return '0';
  return x;
};

export const ZERO_BIG_NUMBER = new BigNumber(0);

export function isBigNumberish(value: unknown): value is BigNumberish {
  return (
    value != null &&
    (BigNumber.isBigNumber(value) ||
      (typeof value === 'number' && value % 1 === 0) ||
      (typeof value === 'string' && !!value.match(/^-?[0-9]+$/)) ||
      isHexString(value) ||
      typeof value === 'bigint')
  );
}

export const getAmountMinusSlippage = (
  value: BigNumber,
  slippage: string
): BigNumber => {
  const slippageBn = FixedPointMath.toBigNumber(+slippage, 3);
  const newAmount = value
    .minus(value.multipliedBy(slippageBn).dividedBy(new BigNumber(1000)))
    .decimalPlaces(0, BigNumber.ROUND_DOWN);

  return newAmount.eq(value) ? newAmount.minus(new BigNumber(1)) : newAmount;
};
