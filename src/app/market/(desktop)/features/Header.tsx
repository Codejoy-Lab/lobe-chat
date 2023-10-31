import { ChatHeader } from '@lobehub/ui';
import { createStyles } from 'antd-style';
import Link from 'next/link';
import { memo } from 'react';

import ShareAgentButton from '../../features/ShareAgentButton';
import Logo from '../../../../components/Icons/logo';

export const useStyles = createStyles(({ css, token }) => ({
  logo: css`
    color: ${token.colorText};
    fill: ${token.colorText};
  `,
}));

const Header = memo(() => {
  const { styles } = useStyles();

  return (
    <ChatHeader
      left={
        <Link aria-label={'home'} href={'/'}>
          <Logo width='277'/>
        </Link>
      }
      // right={<ShareAgentButton />}
    />
  );
});

export default Header;
