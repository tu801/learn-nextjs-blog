import { Webhook } from "svix";
import { clerkClient, WebhookEvent } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { ClerkUserData } from "@/types/clerk";
import { createOrUpdateUser, deleteUser } from "@/lib/actions/user";

export async function POST(req: NextRequest) {
  const SIGNING_SECRET = process.env.SIGNING_SECRET;

  if (!SIGNING_SECRET) {
    throw new Error(
      "Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }
  try {
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

    // Get body
    const payload = await req.json();
    const body = JSON.stringify(payload);

    let evt: WebhookEvent;

    // Verify payload with headers
    try {
      evt = wh.verify(body, {
        "svix-id": svix_id,
        "svix-timestamp": svix_timestamp,
        "svix-signature": svix_signature,
      }) as WebhookEvent;
    } catch (err) {
      console.error("Error: Could not verify webhook:", err);
      return NextResponse.json("Error: Verification error", {
        status: 400,
      });
    }

    // Do something with payload
    const eventType = evt.type;

    // Kiểm tra loại event và xử lý
    if (eventType === "user.created" || eventType === "user.updated") {
      const userData: ClerkUserData = {
        id: evt.data.id,
        first_name: evt.data.first_name || "",
        last_name: evt.data.last_name || "",
        email_address: evt.data.email_addresses[0].email_address,
        image_url: evt.data.image_url,
        username: evt.data.username || "",
      };

      try {
        const client = await clerkClient();
        const newUser = await createOrUpdateUser(userData);

        if (newUser && eventType === "user.created") {
          try {
            await client.users.updateUserMetadata(userData.id, {
              publicMetadata: {
                userMongoId: newUser._id,
                isAdmin: newUser.isAdmin,
              },
            });
          } catch (error) {
            console.error("Set Clerk user meta error!", error);
          }
        }
        console.info("New user created ");
      } catch (error) {
        console.log("Error create or update user ", error);
        return NextResponse.json(
          { error: "Webhook verification failed" },
          { status: 400 }
        );
      }
    }
    if (eventType === "user.deleted") {
      const { id } = evt?.data;
      if (id === undefined) return;
      try {
        await deleteUser(id);
        console.info(`User #${id} deleted!`);
      } catch (error) {
        console.log("Error delete user", error);
        return NextResponse.json(
          { error: "Webhook verification failed" },
          { status: 400 }
        );
      }
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
