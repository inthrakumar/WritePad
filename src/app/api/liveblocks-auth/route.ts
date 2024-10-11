import { Liveblocks } from '@liveblocks/node';
import { env_varaibles } from '@/config/envconfig';
import { getUserColors } from '@/utils/UserUtils';
import { ConvexHttpClient } from 'convex/browser';
import { api } from '../../../../convex/_generated/api';
const liveblocks = new Liveblocks({
  secret: env_varaibles.LIVEBLOCKS_SECRET_KEY!,
});

const convex = new ConvexHttpClient(env_varaibles.NEXT_PUBLIC_CONVEX_URL!);

export async function POST(req: Request) {
  const req_body = await req.json();
  if (!req_body.user_id) {
    return new Response(JSON.stringify({ error: 'User ID is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  const { data } = await convex.query(api.users.fetchUserDetails, {
    userid: req_body.user_id,
  });

  if (!data) {
    return new Response(JSON.stringify({ error: 'User not authenticated' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  const colorArray = getUserColors();
  const { status, body } = await liveblocks.identifyUser(
    {
      userId: data[0].userid,
      groupIds: [],
    },
    {
      userInfo: {
        id: data[0].userid,
        email: data[0].email,
        username: data[0].username,
        avatarUrl: `https://api.dicebear.com/9.x/initials/svg?seed=${data[0].username}`,
        colors: colorArray.hex,
      },
    }
  );
  return new Response(JSON.stringify({ message: 'User Authenticated' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
