import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  users: defineTable({
    username: v.string(),
    userid: v.string(),
    email: v.string(),
  }).index('by_user_id', ['userid']),
});
