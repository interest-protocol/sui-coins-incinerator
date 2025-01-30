import { Motion } from '@interest-protocol/ui-kit';
import { CoinMetadata } from '@mysten/sui/client'; // Importe o tipo CoinMetadata
import { normalizeSuiAddress } from '@mysten/sui/utils';
import { FC } from 'react';
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';

import { IncineratorForm } from '../../incinerator.types';
import IncineratorTableRow from './incinerator-table-row';

const IncineratorTableBody: FC = () => {
  const { control } = useFormContext<IncineratorForm>();

  const { fields } = useFieldArray({ control, name: 'objects' });
  const search = useWatch({ control, name: 'search' });

  const normalizedSearch = search?.toLowerCase().trim() || '';

  const filteredField = fields.filter((el) => {
    if (!normalizedSearch) return true;

    const metadata = el.display?.metadata as Omit<
      CoinMetadata,
      'symbol' | 'decimals'
    >;

    const metadataName = metadata?.name
      ?.toLowerCase()
      .includes(normalizedSearch);

    return (
      el.display?.symbol?.toLowerCase().includes(normalizedSearch) ||
      el.type?.toLowerCase().includes(normalizedSearch) ||
      normalizeSuiAddress(el?.type) === normalizeSuiAddress(normalizedSearch) ||
      metadataName ||
      el.display?.type?.toLowerCase().includes(normalizedSearch) ||
      normalizeSuiAddress(el.display?.type || '') ===
        normalizeSuiAddress(normalizedSearch || '') ||
      el.objectId?.toLowerCase().includes(normalizedSearch)
    );
  });

  return (
    <Motion as="tbody">
      {filteredField.map((field, index) => (
        <IncineratorTableRow index={index} object={field} key={field.id} />
      ))}
    </Motion>
  );
};

export default IncineratorTableBody;
