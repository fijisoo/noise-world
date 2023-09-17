import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function POST(request: NextRequest) {
  const data = await request.json();

  const { company, firstName, secondName, email, phoneNumber, message } = data;

  try {
    await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(
        {
          formName: "Contact form",
          subject: `Company:${company} Phone:${phoneNumber}`,
          from: `"${firstName} ${secondName}" ${email}`,
          message,
          ["access_key"]: process.env.WEB3FORMS_KEY,
        },
        null,
        2
      ),
    });
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
