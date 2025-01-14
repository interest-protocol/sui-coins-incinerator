import { Button } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { BurnSVG } from '@/components/svg';
import { useBlocklist } from '@/hooks/use-blocklist';
import { useVerifiedDeFiNfts } from '@/hooks/use-verified-defi-nfts';

import { useOnBurn } from './incinerator.hooks';
import { IncineratorForm } from './incinerator.types';

const IncineratorBurnScams: FC = () => {
  const onBurn = useOnBurn();
  const { data, isLoading, error } = useBlocklist();
  const { data: verifiedDeFiNfts } = useVerifiedDeFiNfts();
  const { control, setValue } = useFormContext<IncineratorForm>();

  const objects = useWatch({ control, name: 'objects' });

  const disabled =
    isLoading ||
    !!error ||
    !objects.length ||
    !objects.some(({ type }) => data?.includes(type));

  const onSelectScams = () => {
    if (disabled) return;
    if (!data) return;

    const selectObjects = objects.reduce(
      (acc, curr, index) => {
        if (
          verifiedDeFiNfts?.includes(
            curr.kind === 'Coin' ? curr.display!.type : curr.type
          ) ||
          !data.includes(curr.kind === 'Coin' ? curr.display!.type : curr.type)
        )
          return acc;

        setValue(`objects.${index}.active`, true);

        return [...acc, curr];
      },
      [] as IncineratorForm['objects']
    );

    if (!selectObjects.length) return;

    onBurn({ objects: selectObjects });
  };

  return (
    <Button
      variant="tonal"
      bg="errorContainer"
      borderRadius="full"
      alignItems="center"
      position="relative"
      whiteSpace="nowrap"
      disabled={disabled}
      onClick={onSelectScams}
      color="onErrorContainer"
      borderColor="outlineVariant"
      nHover={!disabled && { bg: 'error', color: 'surface' }}
      nActive={!disabled && { bg: 'error', color: 'surface' }}
    >
      <BurnSVG maxWidth="1.2rem" maxHeight="1.2rem" width="100%" />
      Burn scams
    </Button>
  );
};

export default IncineratorBurnScams;
