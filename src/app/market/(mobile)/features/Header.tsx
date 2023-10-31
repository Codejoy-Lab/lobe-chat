import { MobileNavBar } from '@lobehub/ui';
import { memo } from 'react';

import ShareAgentButton from '../../features/ShareAgentButton';
import Logo from '../../../../components/Icons/logo';

const Header = memo(() => {
  return <MobileNavBar center={<Logo />} 
  // right={<ShareAgentButton mobile />} 
  />;
});

export default Header;
