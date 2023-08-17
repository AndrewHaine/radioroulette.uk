import csrf from 'edge-csrf';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const csrfProtect = csrf({
  cookie: {
    secure: process.env.NODE_ENV === 'production',
  },
});

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  const csrfError = await csrfProtect(request, response);

  if (csrfError) {
      return NextResponse.json({ message: 'csrf' }, { status: 403 });
  }
    
  return response;
}