import { query } from './_generated/server';
import { v } from 'convex/values';

const getFolderContents = query({
  args: { folderName: v.string() },
  handler: async (ctx, args) => {
    const decodedFolderName = decodeURIComponent(args.folderName);
    const urlsplit = decodedFolderName.split('/');
    const foldername = urlsplit[urlsplit.length - 1];
    const parenturl =
      urlsplit.length == 3
        ? '/documents'
        : '/documents' + encodeURIComponent(urlsplit.slice(2, -1).join('/'));
    const result = await ctx.db
      .query('userRecords')
      .filter((q) =>
        q.and(
          q.eq(q.field('roomTitle'), foldername),
          q.eq(q.field('parent'), parenturl)
        )
      )
      .collect();
    if (result.length == 0) {
      return {
        status: true,
        isDeleted: true,
      };
    }
    const folderContents = await ctx.db
      .query('userRecords')
      .withIndex('parent_url', (q) => q.eq('parent', args.folderName))
      .collect();
    return { success: true, data: folderContents };
  },
});

export { getFolderContents };
