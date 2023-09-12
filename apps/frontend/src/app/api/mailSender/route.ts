const nodemailer = require("nodemailer");
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function POST(request: NextRequest) {
  const data = await request.json();

  console.log('data', data)

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      type: "OAuth2",
      clientId: process.env.GMAIL_CLIENT_ID,
      clientSecret: process.env.GMAIL_CLIENT_SECRET,
    },
  });

  const mailData = {
    from: `"${data?.first_name} ${data?.second_name}" ${data?.email}`,
    to: "contact@sync.art",
    subject: `Company:${data?.company} Phone:${data?.phone_number}`,
    text: `${data?.message}`,
    auth: {
      user: "syncart0073@gmail.com",
      refreshToken: process.env.GMAIL_REFRESH_TOKEN,
      accessToken: process.env.GMAIL_ACCESS_TOKEN,
      expires: new Date().getTime(),
    },
  };

  try {
    await transporter.sendMail(mailData);
    return NextResponse.json({ message: "Message sent", success: true });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message:
        "There is a problem with contact form. Please contact us directly: contact@sync.art",
      success: false,
    });
  }
}
