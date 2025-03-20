import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const GHOST_ADMIN_API_URL = process.env.GHOST_ADMIN_API_URL; // Example: 'https://yourghostsite.com/ghost/api/admin'
const GHOST_ADMIN_API_KEY = process.env.GHOST_ADMIN_API_KEY; // Get from Ghost Admin

if (!GHOST_ADMIN_API_URL || !GHOST_ADMIN_API_KEY) {
  throw new Error("Ghost API URL or Admin API Key is missing in environment variables.");
}

// Generate JWT for authentication
const getGhostAdminToken = () => {
  const [id, secret] = GHOST_ADMIN_API_KEY.split(":");
  return jwt.sign({}, Buffer.from(secret, "hex"), {
    keyid: id,
    algorithm: "HS256",
    expiresIn: "5m",
    audience: "/admin/",
  });
};

// API Route
export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email) return NextResponse.json({ error: "Email is required" }, { status: 400 });

    const response = await fetch(`${GHOST_ADMIN_API_URL}/members/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Ghost ${getGhostAdminToken()}`,
      },
      body: JSON.stringify({
        members: [{ email, subscribed: true }],
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json({ error: errorData.errors || "Failed to create member" }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
