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

  roomDetails: defineTable({
    roomId: v.string(),
    roomTitle: v.string(),
    lastEdited: v.string(),
    userid: v.string(),
  }).index('user_id', ['userid']),
});
