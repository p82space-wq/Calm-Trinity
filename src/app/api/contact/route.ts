import { NextResponse } from "next/server";

type ContactRequestBody = {
  name: string;
  email: string;
  subject?: string;
  message: string;
};

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactRequestBody;

    if (!body.name?.trim() || !body.email?.trim() || !body.message?.trim()) {
      return NextResponse.json(
        { error: "必須項目を入力してください" },
        { status: 400 },
      );
    }

    if (!isValidEmail(body.email)) {
      return NextResponse.json(
        { error: "有効なメールアドレスを入力してください" },
        { status: 400 },
      );
    }

    const accessKey = process.env.WEB3FORMS_ACCESS_KEY;

    if (!accessKey) {
      return NextResponse.json(
        {
          error:
            "お問い合わせフォームが設定されていません。メールで直接ご連絡ください。",
        },
        { status: 503 },
      );
    }

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: accessKey,
        name: body.name.trim(),
        email: body.email.trim(),
        subject: body.subject?.trim() || "Calm Trinity お問い合わせ",
        message: body.message.trim(),
        from_name: "Calm Trinity Website",
      }),
    });

    const data = (await response.json()) as { success: boolean; message?: string };

    if (!data.success) {
      console.error("Web3Forms error:", data.message);
      return NextResponse.json(
        { error: "送信に失敗しました。時間をおいて再度お試しください。" },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);

    return NextResponse.json(
      { error: "送信に失敗しました" },
      { status: 500 },
    );
  }
}
