import { Liveblocks } from '@liveblocks/node';
import { env_varaibles } from '@/config/envconfig';
import { PrismaClient } from '@prisma/client';
const liveblocks = new Liveblocks({
  secret: env_varaibles.LIVEBLOCKS_SECRET_KEY!,
});
const prisma = new PrismaClient();
export async function POST(req: Request) {
  // Parse the request body
  const req_body = await req.json();
  const user = await prisma.user.findUnique({
    where: {
      userid: req_body.user_id,
    },
  });

  if (!user) {
    return new Response(JSON.stringify({ error: 'User not found' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  // const { status, body } = await liveblocks.identifyUser({
  //   userId: user_id,
  // });

  return new Response(JSON.stringify({ message: 'Hello from Next.js!' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
