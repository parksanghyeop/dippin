import { Box } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import { BottomTabBar } from '../components/BottomTabBar';
import { MainNavBar } from '../components/MainNavBar';
import { ModalNavBar } from '../components/ModalNavBar';
import { SearchNavBar } from '../components/SearchNavBar';

export const Layout = () => (
  <div>
    <Box h="48px" w="full" />
    <Outlet />
    <div>layout</div>
    <ColorModeSwitcher />
    <Box h="48px" w="full" />

    {/* ==Floating Component== */}
    <BottomTabBar />
  </div>
);
