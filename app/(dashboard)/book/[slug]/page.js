import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, BookOpen, Euro, Layers, Tag, Sparkles, CheckCircle2, Clock3, Copy } from "lucide-react";
import { GetBookBySlug } from "@/lib/cache-functions";

function StatusBadge({ status }) {
  const isPublic = status === "public";
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-medium ${isPublic ? "bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200" : "bg-amber-100 text-amber-700 ring-1 ring-amber-200"}`}>
      {isPublic ? <CheckCircle2 className="h-3.5 w-3.5" /> : <Clock3 className="h-3.5 w-3.5" />}
      {isPublic ? "Δημόσιο" : "Πρόχειρο"}
    </span>
  );
}

function SourceBadge({ source }) {
  if (!source) return null;
  const isCopy = source === "copy";

  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-medium ${isCopy ? "bg-slate-900 text-slate-50" : "bg-slate-100 text-slate-700"}`}>
      {isCopy ? <Copy className="h-3.5 w-3.5" /> : <Sparkles className="h-3.5 w-3.5" />}
      {isCopy ? "Copy έκδοση" : "Original"}
    </span>
  );
}

const BookPage = async ({ params }) => {
  const { slug } = await params;
  const book = await GetBookBySlug(slug, true);

  if (!book) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900 flex items-center justify-center px-4">
        <div className="max-w-md rounded-2xl border border-slate-200 bg-white px-6 py-6 shadow-sm text-center">
          <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
            <BookOpen className="h-5 w-5" />
          </div>
          <h1 className="text-base font-semibold">Το βιβλίο δεν βρέθηκε</h1>
          <p className="mt-1 text-sm text-slate-500">Ίσως διαγράφηκε ή ο σύνδεσμος δεν είναι πλέον έγκυρος.</p>
          <Link href="/books" className="mt-4 inline-flex items-center justify-center rounded-full bg-slate-900 px-4 py-1.5 text-xs font-medium text-white hover:bg-slate-800">
            <ArrowLeft className="mr-1.5 h-3.5 w-3.5" />
            Επιστροφή στη βιβλιοθήκη
          </Link>
        </div>
      </div>
    );
  }

  const cover = book.cover || "/default-cover.webp";
  const lessons = Array.isArray(book.lessons) ? book.lessons : [];
  const lessonsCount = lessons.length;
  const descriptionParts = Array.isArray(book.description) ? book.description : [];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="px-4 py-8 space-y-8">
        {/* Top bar */}
        <div className="flex items-center justify-between gap-4">
          <Link href="/books" className="inline-flex items-center gap-2 text-xs font-medium text-slate-600 hover:text-slate-900">
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm">
              <ArrowLeft className="h-4 w-4" />
            </span>
            <span className="hidden sm:inline">Επιστροφή στη βιβλιοθήκη</span>
          </Link>

          <div className="flex items-center gap-2">
            <StatusBadge status={book.status} />
            <SourceBadge source={book.source} />
          </div>
        </div>

        {/* Main card */}
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-6 md:flex-row">
            {/* Small vertical cover */}
            <div className="flex flex-col items-center md:items-start">
              <div className="relative h-56 w-40 overflow-hidden rounded-xl border border-slate-200 bg-slate-100 shadow-sm">
                <Image src={cover} alt={book.title} fill sizes="160px" className="object-cover" />
              </div>
              <div className="mt-3 inline-flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1 text-[11px] font-medium text-blue-700">
                <BookOpen className="h-3.5 w-3.5" />
                Βιβλίο
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 space-y-4">
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600">
                {book.category && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1">
                    <Tag className="h-3.5 w-3.5" />
                    {book.category}
                  </span>
                )}

                <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1">
                  <Layers className="h-3.5 w-3.5" />
                  {lessonsCount} μαθήματα
                </span>

                <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1">
                  <Euro className="h-3.5 w-3.5" />
                  {(book.price ?? 9.99).toFixed(2)} €
                </span>
              </div>
              <div className="space-y-2 border-b border-gray-200 pb-2">
                <h1 className="text-xl md:text-2xl font-semibold leading-snug tracking-tight text-slate-900">{book.title}</h1>
              </div>

              {descriptionParts.length > 0 && (
                <div className="space-y-5 text-sm text-slate-700">
                  {descriptionParts.map((paragraph, index) => (
                    <p key={`desc-${index}`}>{paragraph}</p>
                  ))}
                </div>
              )}

              {book.persona && (
                <div className="mt-2 rounded-xl border border-slate-100 bg-slate-50 px-3 py-2.5">
                  <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-700">
                    <Sparkles className="h-3.5 w-3.5 text-blue-500" />
                    Persona / Στόχος βιβλίου
                  </div>
                  <p className="mt-1 text-xs text-slate-600 whitespace-pre-line">{book.persona}</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Lessons */}
        {lessonsCount > 0 && (
          <section className="space-y-3">
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                <Layers className="h-4 w-4 text-blue-500" />
                Μαθήματα
              </h2>
              <span className="text-[11px] text-slate-500">
                Συνολικά <span className="font-semibold text-slate-900">{lessonsCount}</span> μαθήματα
              </span>
            </div>

            <div className="space-y-2.5">
              {lessons.map((lesson, index) => (
                <div key={`lesson-${index}`} className="rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-blue-50 text-blue-600 text-[11px] font-semibold">{index + 1}</div>
                    <p className="text-xs text-slate-700 whitespace-pre-line">{lesson}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default BookPage;
