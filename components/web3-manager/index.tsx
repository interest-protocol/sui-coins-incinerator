import { FC } from 'react';

import AllObjectsManager from './all-objects-manager';
import CoinsManager from './coins-manager';

const Web3Manager: FC = () => (
  <>
    <CoinsManager />
    <AllObjectsManager withBlocked={true} />
  </>
);

export default Web3Manager;
