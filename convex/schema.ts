import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    userid: v.string(),
    username: v.string(),
    email: v.string()
  })
});
