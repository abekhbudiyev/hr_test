import { NextResponse } from "next/server";
import { createCandidateRecord } from "@/lib/hr-data";

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") ?? "";
  const payload: Partial<{
    toliqIsm: string;
    jshshir: string;
    telefon: string;
    lavozim: string;
    tajriba: string;
    rozilik: boolean | string;
  }> = contentType.includes("application/json")
    ? ((await request.json()) as Partial<{
        toliqIsm: string;
        jshshir: string;
        telefon: string;
        lavozim: string;
        tajriba: string;
        rozilik: boolean | string;
      }>)
    : Object.fromEntries(await request.formData());

  const requiredFields = ["toliqIsm", "jshshir", "telefon", "lavozim", "tajriba"] as const;
  const missingField = requiredFields.find((field) => !payload[field]);

  if (missingField) {
    return NextResponse.json(
      { error: `${missingField} maydoni to'ldirilishi shart.` },
      { status: 400 },
    );
  }

  if (!(payload.rozilik === true || payload.rozilik === "true" || payload.rozilik === "on")) {
    return NextResponse.json(
      { error: "Shaxsga doir ma'lumotlarni qayta ishlashga rozilik berilishi shart." },
      { status: 400 },
    );
  }

  const record = createCandidateRecord({
    toliqIsm: payload.toliqIsm!,
    jshshir: payload.jshshir!,
    telefon: payload.telefon!,
    lavozim: payload.lavozim!,
    tajriba: payload.tajriba!,
  });

  return NextResponse.json(record, { status: 201 });
}
