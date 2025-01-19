import { Webhook } from "svix";
import { WebhookEvent } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const SIGNING_SECRET = process.env.SIGNING_SECRET;

  if (!SIGNING_SECRET) {
    throw new Error(
      "Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }
  try {
    // Lấy payload và headers từ request
    const payload = await req.text();
    const headers = Object.fromEntries(req.headers);

    // Tạo đối tượng Webhook từ svix
    const wh = new Webhook(SIGNING_SECRET);

    // Get headers
    const headerPayload = req.headers;
    const svix_id = headerPayload.get("svix-id");
    const svix_timestamp = headerPayload.get("svix-timestamp");
    const svix_signature = headerPayload.get("svix-signature");

    // If there are no headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
      return new Response("Error: Missing Svix headers", {
        status: 400,
      });
    }
    let evt: WebhookEvent;

    // Xác minh payload
    const jsonPayload = wh.verify(payload, headers);
    try {
      evt = wh.verify(payload, {
        "svix-id": svix_id,
        "svix-timestamp": svix_timestamp,
        "svix-signature": svix_signature,
      }) as WebhookEvent;
    } catch (err) {
      console.error("Error: Could not verify webhook:", err);
      return new Response("Error: Verification error", {
        status: 400,
      });
    }

    // Do something with payload
    const { id } = evt.data;
    const eventType = evt.type;

    // Kiểm tra loại event và xử lý
    if (eventType === "user.created") {
      const userId = evt.data.id;
      console.log("New user created with ID:", userId);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error verifying webhook:", error);
    return NextResponse.json(
      { error: "Webhook verification failed" },
      { status: 400 }
    );
  }
}
