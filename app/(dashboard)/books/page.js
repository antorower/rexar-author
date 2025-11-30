import { GetBooks } from "@/lib/cache-functions";
import BugPage from "@/components/ui/static/BugPage";
import { BookOpen } from "lucide-react";
import Link from "next/link";
import BookCard from "@/components/ui/BookCard";

const Page = async ({ searchParams }) => {
  const { page: rawPage } = await searchParams;
  const page = Math.max(1, Number(rawPage ?? 1));

  const { success, data: books = [], pagination } = await GetBooks({ page });

  if (!success) return <BugPage />;

  const currentPage = pagination?.currentPage ?? page;
  const totalPages = pagination?.totalPages ?? 1;
  const total = pagination?.total ?? books.length;

  return (
    <div className="relative bg-slate-50 text-slate-900 min-h-screen">
      <div className="px-4 space-y-8 pb-24 pt-6">
        {/* Sticky header */}
        <div className="sticky top-4 z-20 flex items-center justify-between rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 shadow-sm backdrop-blur">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl text-blue-600">
                <BookOpen className="h-5 w-5" />
              </span>
              <div>
                <h1 className="font-semibold leading-tight text-md">Η Βιβλιοθήκη μου</h1>
                <p className="text-slate-500 text-sm">Οργάνωσε τα βιβλία που έχεις δημιουργήσει.</p>
              </div>
            </div>
          </div>
          <Link href="/create" className="bg-blue-600 text-white rounded-lg px-4 py-2 text-sm font-medium shadow-sm hover:bg-blue-700 hidden md:inline-flex">
            Δημιουργία Νέου Βιβλίου
          </Link>
        </div>

        {/* Cards grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {books.map((book) => (
            <BookCard key={book.slug || book._id.toString()} book={book} />
          ))}

          {books.length === 0 && <div className="col-span-full h-[200px] rounded-xl border border-dashed border-slate-200 bg-white/70 shadow-sm flex items-center justify-center text-sm text-slate-400">Δεν υπάρχουν ακόμα βιβλία.</div>}
        </div>

        {/* Bottom sticky bar = pagination + context */}
        {totalPages > 1 && (
          <div className="sticky bottom-4 z-20 flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 shadow-sm backdrop-blur">
            <div className="text-xs text-slate-500">
              Συνολικά <span className="font-semibold text-slate-900">{total}</span> βιβλία
            </div>

            <div className="flex items-center gap-2 text-xs">
              <Link href={`?page=${Math.max(currentPage - 1, 1)}`} className={`rounded-full border px-3 py-1.5 transition ${currentPage <= 1 ? "cursor-not-allowed border-slate-200 text-slate-300 bg-white" : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"}`} aria-disabled={currentPage <= 1}>
                Προηγούμενη
              </Link>

              <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[11px] text-slate-700">
                Σελίδα <span className="font-semibold text-blue-600">{currentPage}</span> από <span className="font-semibold">{totalPages}</span>
              </span>

              <Link href={`?page=${Math.min(currentPage + 1, totalPages)}`} className={`rounded-full border px-3 py-1.5 transition ${currentPage >= totalPages ? "cursor-not-allowed border-slate-200 text-slate-300 bg-white" : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"}`} aria-disabled={currentPage >= totalPages}>
                Επόμενη
              </Link>
            </div>

            <div className="hidden sm:block text-[11px] text-slate-400">Εμφανίζονται κάρτες μόνο (χωρίς list view προς το παρόν).</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
