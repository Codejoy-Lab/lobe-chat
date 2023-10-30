import { redirect } from 'next/navigation';

import { isMobileDevice } from '@/utils/responsive';
import { getSession, getUserProfile } from '@/utils/supabase';

import DesktopPage from './(desktop)';
import MobilePage from './(mobile)';

async function Page() {
  const [session, profile] = await Promise.all([
    getSession(),
    getUserProfile(),
    // getSubscription(),
  ]);

  console.log(session)
  const user = session?.user;

  if (!session) {
    return redirect('/auth/signin');
  }
  const mobile = isMobileDevice();

  const Page = mobile ? MobilePage : DesktopPage;

  return <Page />;
}

export default Page;
