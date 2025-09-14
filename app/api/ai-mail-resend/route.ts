import { NextResponse } from "next/server";
import { sendContactEmail } from "@/lib/resend";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const json = await req.json().catch(() => null);
  const result = await sendContactEmail(json);

  if (!result.ok) {
    // Единый формат ошибок для клиента
    return NextResponse.json(
      { ok: false, error: result.error, details: result["details"] ?? undefined },
      { status: result.status }
    );
  }

  return NextResponse.json({ ok: true, id: result.id }, { status: 200 });
}
