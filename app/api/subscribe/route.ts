import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Advanced email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
    }

    // Send confirmation email
    const { data, error } = await resend.emails.send({
      from: `OUTPLAY <${process.env.RESEND_FROM_EMAIL}>`,
      to: email,
      subject: "Newsletter Subscription Confirmation",
      html: `
        <div>
          <h1>Thank you for subscribing!</h1>
          <p>You've been added to our newsletter list.</p>
        </div>
      `,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    // Here you would typically also add the subscriber to your database or service

    return NextResponse.json(
      { success: true, message: "Successfully subscribed to newsletter" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
