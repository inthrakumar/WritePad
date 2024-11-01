import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  users: defineTable({
    username: v.string(),
    userid: v.string(),
    email: v.string(),
  })
    .index('by_user_id', ['userid'])
    .index('by_email', ['email']),

  userRecords: defineTable({
    parent: v.string(),
    roomId: v.string(),
    roomTitle: v.string(),
    lastEdited: v.string(),
    userid: v.string(),
    type: v.string(),
  })
    .index('user_id', ['userid'])
    .index('parent_url', ['parent'])
    .index('by_room_id', ['roomId']),

  sharedRooms: defineTable({
    userid: v.string(),
    roomIds: v.array(v.string()),
  }).index('user_id', ['userid']),
});
