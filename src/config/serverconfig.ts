import { ConvexHttpClient } from 'convex/browser';
import { Liveblocks } from '@liveblocks/node';
const liveblocks_connection = new Liveblocks({
  secret: env_varaibles.LIVEBLOCKS_SECRET_KEY!,
});
import { env_varaibles } from './envconfig';
const convex_connection = new ConvexHttpClient(
  env_varaibles.NEXT_PUBLIC_CONVEX_URL!
);
export { convex_connection, liveblocks_connection };
