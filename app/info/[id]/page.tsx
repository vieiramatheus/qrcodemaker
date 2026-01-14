import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";

interface InfoPageProps {
  params: {
    id: string;
  };
}

async function loadEntry(id: string) {
  return prisma.entry.findUnique({
    where: { id }
  });
}

export async function generateMetadata({ params }: InfoPageProps) {
  const entry = await loadEntry(params.id);

  if (!entry) {
    return {
      title: "Entry not found"
    };
  }

  const baseTitle = entry.label ? `${entry.label} · QR Info Maker` : "QR Info Maker";

  return {
    title: baseTitle,
    description: entry.content.slice(0, 140)
  };
}

export default async function InfoPage({ params }: InfoPageProps) {
  const entry = await loadEntry(params.id);

  if (!entry) {
    notFound();
  }

  return (
    <main className="flex flex-col gap-6">
      <header className="flex flex-col gap-2">
        <p className="text-xs uppercase tracking-widest text-indigo-300/80">Shared information</p>
        <h1 className="text-3xl font-semibold text-slate-100">
          {entry.label?.trim() || "Untitled entry"}
        </h1>
        <p className="text-xs text-slate-400">
          Saved on {entry.createdAt.toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" })}
        </p>
      </header>
      <article className="whitespace-pre-wrap rounded-xl border border-slate-800/80 bg-slate-900/60 p-6 text-sm text-slate-100">
        {entry.content}
      </article>
      <footer className="flex flex-wrap gap-3 text-sm text-slate-400">
        <Link href="/" className="underline-offset-4 hover:underline">
          Create another QR entry
        </Link>
      </footer>
    </main>
  );
}
