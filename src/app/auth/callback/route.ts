import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

import type { NextRequest } from 'next/server'
import type { Database } from 'database.types'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  console.log(requestUrl)
  const code = requestUrl.searchParams.get('code')

  if (code) {
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient<Database>({ cookies: () => cookieStore })
    const session = await supabase.auth.exchangeCodeForSession(code)
    console.log(session)
  }

  // URL to redirect to after sign in process completes
  return NextResponse.redirect(requestUrl.origin)
}