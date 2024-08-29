import { clerkClient } from "@clerk/nextjs/server";
import { IncomingHttpHeaders } from "http";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Webhook, WebhookRequiredHeaders } from "svix";
const webhookSecret = process.env.WEBHOOK_SECRET || "";
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function handler(request: Request) {
  try {
    
    const payload = await request.json();
    const headersList = headers();
    const heads = {
      "svix-id": headersList.get("svix-id"),
      "svix-timestamp": headersList.get("svix-timestamp"),
      "svix-signature": headersList.get("svix-signature"),
    };
    const wh = new Webhook(webhookSecret);
    const evt = wh.verify(
      JSON.stringify(payload),
      heads as IncomingHttpHeaders & WebhookRequiredHeaders
    ) as Event;

    const eventType: EventType = evt.type;

    if (eventType === "user.created" || eventType === "user.updated") {
      const { id, ...attributes } = evt.data;
      const userid = id.toString();
      const email = attributes.email_addresses[0].email_address;
      const username = attributes.first_name || attributes.username || "guest";
    
      const user = await prisma.user.create({
  data: {
    userid,
    email,
    username,
  },
});
      
   
      return NextResponse.json({ success: true }, { status: 200 }); 
    } else {
      return NextResponse.json({ error: "Unsupported event type" }, { status: 400 });
    }
  } catch (err) {
    console.error((err as Error).message);
    return NextResponse.json({ error: "Bad Request" }, { status: 400 });
  }
}

type EventType = "user.created" | "user.updated" | "*";

type Event = {
  data: Record<string, any>;
  object: "event";
  type: EventType;
};

export const GET = handler;
export const POST = handler;
export const PUT = handler;
