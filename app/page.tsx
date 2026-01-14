import EntryForm from "@/components/entry-form";
import EntryList from "@/components/entry-list";
import { prisma } from "@/lib/prisma";

export default async function HomePage() {
  const entries = await prisma.entry.findMany({
    orderBy: { createdAt: "desc" }
  });

  return (
    <main className="flex flex-col gap-8">
      <section className="flex flex-col gap-3">
        <h1 className="text-3xl font-semibold">QR Information Maker</h1>
        <p className="max-w-2xl text-sm text-slate-300">
          Store any text snippet safely, then share it instantly with a QR code that
          opens a hosted detail page for the saved entry.
        </p>
      </section>
      <EntryForm />
      <EntryList entries={entries} />
    </main>
  );
}
