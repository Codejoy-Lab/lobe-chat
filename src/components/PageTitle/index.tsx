import { memo, useEffect } from 'react';

const PageTitle = memo<{ title: string }>(({ title }) => {
  useEffect(() => {
    document.title = title ? `${title} · CoolAI` : 'CoolAI';
  }, [title]);

  return null;
});

export default PageTitle;
