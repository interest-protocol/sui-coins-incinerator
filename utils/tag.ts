import { normalizeStructTag, SUI_TYPE_ARG } from '@mysten/sui/utils';

export const isSameStructTag = (tagA: string, tagB: string) =>
  normalizeStructTag(tagA) === normalizeStructTag(tagB);

export const isSui = (type: string) => isSameStructTag(type, SUI_TYPE_ARG);

const isSymbol = (text: string): boolean => new RegExp(/^[A-Z-]+$/g).test(text);

export const getSymbolByTag = (type?: string): string => {
  const poolTokens = type
    ?.match(/::[a-z0-9_]+::+([^>,]+).+?::[a-z0-9_]+::([^>,]+)/i)
    ?.filter(isSymbol)
    .map((text) => text.match(/[A-Z0-9]+/g)?.[0]);

  if (!poolTokens)
    return (
      type
        ?.match(/::[a-z0-9_]+::+([^,]+)/i)
        ?.filter(isSymbol)
        .join('-') ?? ''
    );

  return poolTokens.join('-');
};
