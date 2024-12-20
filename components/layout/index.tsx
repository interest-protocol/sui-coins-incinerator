import { Box } from '@interest-protocol/ui-kit';
import { FC, PropsWithChildren } from 'react';

import { ModalProvider } from '@/context/modal';

import Web3Manager from '../web3-manager';
import Footer from './footer';
import Header from './header';

const Layout: FC<PropsWithChildren> = ({ children }) => (
  <ModalProvider>
    <Box bg="surface" display="flex" height="100vh" overflow="hidden">
      <Box
        flex="1"
        as="aside"
        height="100vh"
        display="flex"
        position="relative"
        flexDirection="column"
        justifyContent="space-between"
      >
        <Header />
        <Web3Manager />
        <Box
          flex="1"
          width="100%"
          display="flex"
          overflowY="auto"
          flexDirection="column"
          justifyContent="space-between"
        >
          <Box as="main" flex="1" my="2xl">
            {children}
          </Box>
          <Footer />
        </Box>
      </Box>
    </Box>
  </ModalProvider>
);

export default Layout;
