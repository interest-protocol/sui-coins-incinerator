import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import IncineratorContent from './incinerator-content';
import IncineratorHeader from './incinerator-header';
import IncineratorManager from './incinerator-manager';
import IncineratorFilterTabs from './incinerator-tabs';

const Incinerator: FC = () => (
  <Box flex="1">
    <Box
      my="m"
      mx="auto"
      width="100%"
      display="flex"
      borderRadius="s"
      maxWidth="51rem"
      bg="lowestContainer"
      flexDirection="column"
    >
      <IncineratorManager />
      <IncineratorHeader />
      <IncineratorFilterTabs />
      <IncineratorContent />
    </Box>
  </Box>
);

export default Incinerator;
