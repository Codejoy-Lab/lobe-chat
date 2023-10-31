import { DraggablePanelBody } from '@lobehub/ui';
import { createStyles } from 'antd-style';
import { memo } from 'react';
import { Flexbox } from 'react-layout-kit';

import FolderPanel from '@/features/FolderPanel';

import UpgradeAlert from '../UpgradeAlert';
import List from './List';
import Logo from '../../../../components/Icons/logo';

const useStyles = createStyles(({ stylish, token, css }) => ({
  body: stylish.noScrollbar,
  logo: css`
    fill: ${token.colorText};
  `,
  top: css`
    position: sticky;
    top: 0;
  `,
}));

const SideBar = memo(() => {
  const { styles } = useStyles();

  return (
    <FolderPanel>
      <DraggablePanelBody className={styles.body} style={{ padding: 0 }}>
        <Flexbox className={styles.top} padding={16}>
          <div>
            <Logo width='277'/>
          </div>
        </Flexbox>
        <UpgradeAlert />
        <Flexbox gap={2} style={{ paddingInline: 6 }}>
          <List />
        </Flexbox>
      </DraggablePanelBody>
    </FolderPanel>
  );
});

export default SideBar;
