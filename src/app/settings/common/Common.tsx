import { Form, type ItemGroup, SelectWithImg, SliderWithInput } from '@lobehub/ui';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Form as AntForm, App, Button, Input, Select } from 'antd';
import { Database } from 'database.types';
import isEqual from 'fast-deep-equal';
import { debounce } from 'lodash-es';
import { AppWindow, Monitor, Moon, Palette, Sun } from 'lucide-react';
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { FORM_STYLE } from '@/const/layoutTokens';
import { DEFAULT_SETTINGS } from '@/const/settings';
import AvatarWithUpload from '@/features/AvatarWithUpload';
import { localeOptions } from '@/locales/options';
import { useChatStore } from '@/store/chat';
import { useFileStore } from '@/store/file';
import { settingsSelectors, useGlobalStore } from '@/store/global';
import { useSessionStore } from '@/store/session';
import { useToolStore } from '@/store/tool';
import { switchLang } from '@/utils/switchLang';

import { ThemeSwatchesNeutral, ThemeSwatchesPrimary } from '../features/ThemeSwatches';
import { useRouter } from 'next/navigation';

type SettingItemGroup = ItemGroup;

export interface SettingsCommonProps {
  showAccessCodeConfig: boolean;
}

const Common = memo<SettingsCommonProps>(({ showAccessCodeConfig }) => {
  const { t } = useTranslation('setting');
  const [form] = AntForm.useForm();

  const clearSessions = useSessionStore((s) => s.clearSessions);
  const [clearTopics, clearAllMessages] = useChatStore((s) => [
    s.removeAllTopics,
    s.clearAllMessages,
  ]);
  const [removeAllFiles] = useFileStore((s) => [s.removeAllFiles]);
  const resetPluginSettings = useToolStore((s) => s.resetPluginSettings);

  const settings = useGlobalStore(settingsSelectors.currentSettings, isEqual);
  const [setThemeMode, setSettings, resetSettings] = useGlobalStore((s) => [
    s.switchThemeMode,
    s.setSettings,
    s.resetSettings,
  ]);

  const { message, modal } = App.useApp();
  const router = useRouter();
  

  const handleReset = useCallback(() => {
    modal.confirm({
      cancelText: t('cancel', { ns: 'common' }),
      centered: true,
      okButtonProps: { danger: true },
      okText: t('ok', { ns: 'common' }),
      onOk: () => {
        resetSettings();
        form.setFieldsValue(DEFAULT_SETTINGS);
      },
      title: t('danger.reset.confirm'),
    });
  }, []);

  const handleClear = useCallback(() => {
    modal.confirm({
      cancelText: t('cancel', { ns: 'common' }),
      centered: true,
      okButtonProps: {
        danger: true,
      },
      okText: t('ok', { ns: 'common' }),
      onOk: async () => {
        await clearSessions();
        resetPluginSettings();
        await clearTopics();
        await removeAllFiles();
        await clearAllMessages();

        message.success(t('danger.clear.success'));
      },
      title: t('danger.clear.confirm'),
    });
  }, []);

  const handleSignOut = useCallback(() => {
    modal.confirm({
      cancelText: t('cancel', { ns: 'common' }),
      centered: true,
      okButtonProps: {
        danger: true,
      },
      okText: t('ok', { ns: 'common' }),
      onOk: async () => {
        const supabase = createClientComponentClient<Database>();
        const { error } = await supabase.auth.signOut();
        if (!error) {
          message.success(t('danger.clear.success'));
          router.push('/welcome');
          router.refresh();
        } else {
          console.log(error);
        }
      },
      title: t('danger.clear.confirm'),
    });
  }, []);

  const theme: SettingItemGroup = {
    children: [
      {
        children: <AvatarWithUpload />,
        label: t('settingTheme.avatar.title'),
        minWidth: undefined,
      },
      {
        children: (
          <SelectWithImg
            defaultValue={settings.themeMode}
            height={60}
            onChange={setThemeMode}
            options={[
              {
                icon: Sun,
                img: '/images/theme_light.webp',
                label: t('settingTheme.themeMode.light'),
                value: 'light',
              },
              {
                icon: Moon,
                img: '/images/theme_dark.webp',
                label: t('settingTheme.themeMode.dark'),
                value: 'dark',
              },
              {
                icon: Monitor,
                img: '/images/theme_auto.webp',
                label: t('settingTheme.themeMode.auto'),
                value: 'auto',
              },
            ]}
            width={100}
          />
        ),
        label: t('settingTheme.themeMode.title'),
        minWidth: undefined,
      },
      {
        children: (
          <Select
            onChange={switchLang}
            options={[{ label: t('settingTheme.lang.autoMode'), value: 'auto' }, ...localeOptions]}
          />
        ),
        label: t('settingTheme.lang.title'),
        name: 'language',
      },
      {
        children: <SliderWithInput max={18} min={12} />,
        desc: t('settingTheme.fontSize.desc'),
        label: t('settingTheme.fontSize.title'),
        name: 'fontSize',
      },
      {
        children: <ThemeSwatchesPrimary />,
        desc: t('settingTheme.primaryColor.desc'),
        label: t('settingTheme.primaryColor.title'),
        minWidth: undefined,
      },
      {
        children: <ThemeSwatchesNeutral />,
        desc: t('settingTheme.neutralColor.desc'),
        label: t('settingTheme.neutralColor.title'),
        minWidth: undefined,
      },
    ],
    icon: Palette,
    title: t('settingTheme.title'),
  };

  const system: SettingItemGroup = {
    children: [
      {
        children: <Input.Password placeholder={t('settingSystem.accessCode.placeholder')} />,
        desc: t('settingSystem.accessCode.desc'),
        hidden: !showAccessCodeConfig,
        label: t('settingSystem.accessCode.title'),
        name: 'password',
      },
      {
        children: (
          <Button danger onClick={handleReset} type="primary">
            {t('danger.reset.action')}
          </Button>
        ),
        desc: t('danger.reset.title'),
        label: t('danger.reset.desc'),
        minWidth: undefined,
      },
      {
        children: (
          <Button danger onClick={handleClear} type="primary">
            {t('danger.clear.action')}
          </Button>
        ),
        desc: t('danger.clear.desc'),
        label: t('danger.clear.title'),
        minWidth: undefined,
      },
      {
        children: (
          <Button danger onClick={handleSignOut} type="primary">
            {t('danger.clear.action')}
          </Button>
        ),
        desc: t('danger.clear.title'),
        label: t('danger.clear.desc'),
        minWidth: undefined,
      },
    ],
    icon: AppWindow,
    title: t('settingSystem.title'),
  };

  return (
    <Form
      form={form}
      initialValues={settings}
      items={[theme, system]}
      onValuesChange={debounce(setSettings, 100)}
      {...FORM_STYLE}
    />
  );
});

export default Common;
