import { getUserColors } from '@/utils/UserUtils';
import { api } from '../../../../convex/_generated/api';
import {
  liveblocks_connection,
  convex_connection,
} from '@/config/serverconfig';
import { auth } from '@clerk/nextjs/server';
export async function POST(req: Request) {
  const userId = auth().userId;
  console.log(userId);
  if (!userId) {
    return new Response(JSON.stringify({ error: 'User ID is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { data } = await convex_connection.query(api.users.fetchUserDetails, {
    userid: userId,
  });
  if (!data) {
    return new Response(JSON.stringify({ error: 'User not authenticated' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  console.log(data);
  const colorArray = getUserColors();
  const { status, body } = await liveblocks_connection.identifyUser(
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
  if (status !== 200) {
    return new Response(
      JSON.stringify({ error: 'Failed to authenticate user' }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  if (!body) {
    return new Response(
      JSON.stringify({ error: 'Authentication failed. Token missing.' }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
  console.log('you are authenticated');
  return new Response(body, { status });
}
