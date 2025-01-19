import { NextRequest, NextResponse } from "next/server";

console.log("Clerk webhook route loaded!");

export async function POST(req: NextRequest) {
  const body = await req.json();
  console.log("Received webhook:", body);

  if (body.type === "user.created") {
    console.log("User created with ID:", body.data.id);
  }

  return NextResponse.json({ message: "Webhook received" });
}
