import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function GET() {
  const entries = await prisma.entry.findMany({
    orderBy: { createdAt: "desc" }
  });

  return NextResponse.json({ entries });
}

export async function POST(request: Request) {
  const payload = (await request.json().catch(() => ({}))) as {
    label?: unknown;
    content?: unknown;
  };

  const content = typeof payload.content === "string" ? payload.content.trim() : "";
  const label =
    typeof payload.label === "string" && payload.label.trim().length > 0
      ? payload.label.trim()
      : null;

  if (!content) {
    return NextResponse.json({ message: "Content is required." }, { status: 400 });
  }

  const entry = await prisma.entry.create({
    data: {
      content,
      label
    }
  });

  revalidatePath("/");

  return NextResponse.json({ entry }, { status: 201 });
}
