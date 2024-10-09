import { Liveblocks } from '@liveblocks/node';
import { env_varaibles } from '@/config/envconfig';
import { PrismaClient } from '@prisma/client';
import { getUserColors } from '@/utils/UserUtils';
const liveblocks = new Liveblocks({
  secret: env_varaibles.LIVEBLOCKS_SECRET_KEY!,
});
const prisma = new PrismaClient();
export async function POST(req: Request) {
  const req_body = await req.json();
  if (!req_body.user_id) {
    return new Response(JSON.stringify({ error: 'User ID is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  const user = await prisma.user.findUnique({
    where: {
      userid: req_body.user_id,
    },
  });

  if (!user) {
    return new Response(JSON.stringify({ error: 'User not authenticated' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  const colorArray = getUserColors();
  const { status, body } = await liveblocks.identifyUser(
    {
      userId: user.userid,
      groupIds: [],
    },
    {
      userInfo: {
        name: user.username,
        avatar: `https://api.dicebear.com/9.x/initials/svg?seed=${user.username}`,
        colors: colorArray,
      },
    }
  );
  return new Response(JSON.stringify({ message: 'User Authenticated' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
