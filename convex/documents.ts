import { query } from './_generated/server';
import { v } from 'convex/values';

const getFolderContents = query({
  args: { folderName: v.string() },
  handler: async (ctx, args) => {
    console.log(args.folderName);
    const folderContents = await ctx.db
      .query('userRecords')
      .withIndex('parent_url', (q) => q.eq('parent', args.folderName))
      .collect();
    return { success: true, data: folderContents };
  },
});

export { getFolderContents };
