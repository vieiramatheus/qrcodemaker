import { prisma } from "@/lib/prisma";
import QRCode from "qrcode";
import { NextResponse } from "next/server";

interface RouteParams {
  params: {
    id: string;
  };
}

export async function GET(request: Request, { params }: RouteParams) {
  const entry = await prisma.entry.findUnique({
    where: { id: params.id }
  });

  if (!entry) {
    return NextResponse.json({ message: "Entry not found." }, { status: 404 });
  }

  const { origin } = new URL(request.url);
  const targetUrl = `${origin}/info/${entry.id}`;

  const pngBuffer = await QRCode.toBuffer(targetUrl, {
    width: 512,
    margin: 1,
    color: {
      dark: "#111827",
      light: "#f8fafc"
    }
  });

  const pngArray = new Uint8Array(pngBuffer);

  return new NextResponse(pngArray, {
    status: 200,
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable"
    }
  });
}
