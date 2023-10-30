'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import type { Database } from 'database.types';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { getURL } from '@/utils/url';

export default function SignIn() {
  const [email, _setEmail] = useState('');
  const [password, _setPassword] = useState('');
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();

  const handleSignUp = async () => {
    let resp = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });
    console.log(resp);
    router.refresh();
  };

  const handleSignIn = async () => {
    let resp = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    console.log(resp);
    router.refresh();
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN') {
        router.push('/welcome');
        router.refresh();
      }
    });

    return () => subscription.unsubscribe();
  });

  return (
    <>
      {/* <input name="email" onChange={(e) => setEmail(e.target.value)} value={email} />
      <input
        type="password"
        name="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <button onClick={handleSignUp}>Sign up</button>
      <button onClick={handleSignIn}>Sign in</button>
      <button onClick={handleSignOut}>Sign out</button> */}
      <Auth
        appearance={{ theme: ThemeSupa }}
        magicLink={true}
        providers={[]}
        redirectTo={`${getURL()}auth/callback`}
        supabaseClient={supabase}
      />
    </>
  );
}
