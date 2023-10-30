import { MobileNavBar } from '@lobehub/ui';
import { memo } from 'react';
import Logo from '../../../../../components/Icons/logo';

const Header = memo(() => {
  return <MobileNavBar center={<Logo />} />;
});

export default Header;
