import {createRouteMatcher, clerkMiddleware } from '@clerk/nextjs/server';
const isProtected = createRouteMatcher(['/shared-docs(.*)','/document(.*)', '/documents(.*)'])
 
export default clerkMiddleware(async (auth, req) => {
const { userId, redirectToSignIn } = await auth();
 
  if (!userId && isProtected(req)) {

    return redirectToSignIn()
  }
})

export const config = {
  matcher: ['/((?!_next/static|favicon.ico).*)', '/api/(.*)'],
};
