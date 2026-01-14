import { Entry } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

const dateFormatter = new Intl.DateTimeFormat("en", {
  dateStyle: "medium",
  timeStyle: "short"
});

interface EntryListProps {
  entries: Entry[];
}

export default function EntryList({ entries }: EntryListProps) {
  if (entries.length === 0) {
    return (
      <section className="rounded-xl border border-dashed border-slate-700/80 bg-slate-900/40 p-8 text-center text-slate-400">
        No entries yet. Add your first note above to generate a QR code.
      </section>
    );
  }

  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold text-slate-100">Saved entries</h2>
      <ul className="flex flex-col gap-4">
        {entries.map((entry) => {
          const infoPath = `/info/${entry.id}`;
          const qrPath = `/api/entries/${entry.id}/qr`;
          const fallbackLabel = entry.label?.trim() || "Untitled entry";
          const formattedDate = dateFormatter.format(entry.createdAt);

          return (
            <li
              key={entry.id}
              className="flex flex-col gap-4 rounded-xl bg-slate-900/60 p-4 shadow-md shadow-slate-950/50 lg:flex-row lg:items-center lg:justify-between"
            >
              <div className="flex flex-col gap-2">
                <div>
                  <p className="text-base font-semibold text-slate-100">{fallbackLabel}</p>
                  <p className="text-xs text-slate-500">{formattedDate}</p>
                </div>
                <p className="text-sm text-slate-300 whitespace-pre-wrap">{entry.content}</p>
                <div className="flex flex-wrap gap-3 text-sm">
                  <Link
                    href={infoPath}
                    className="rounded-md border border-indigo-400/60 px-3 py-1 font-medium text-indigo-300 transition hover:border-indigo-300 hover:text-indigo-200"
                  >
                    View detail page
                  </Link>
                  <a
                    href={qrPath}
                    download={`qr-${entry.id}.png`}
                    className="rounded-md border border-slate-600 px-3 py-1 text-slate-200 transition hover:border-slate-400"
                  >
                    Download QR PNG
                  </a>
                </div>
              </div>
              <div className="flex flex-none justify-center rounded-lg border border-slate-800 bg-slate-950 p-2">
                <Image
                  src={qrPath}
                  alt={`QR code for ${fallbackLabel}`}
                  width={144}
                  height={144}
                  className="h-36 w-36 object-contain"
                />
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
