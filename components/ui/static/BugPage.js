import Link from "next/link";
import { AlertTriangle } from "lucide-react";

const BugPage = () => {
  return (
    <div className="h-full flex items-center justify-center bg-slate-50 px-4 animate-pulse">
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-red-100 bg-white shadow-xl">
        <div className="relative flex flex-col items-center gap-4 px-6 py-6 sm:px-7 sm:py-7">
          {/* Icon + title */}
          <div className="flex h-10 w-10 items-center justify-center rounded-xl text-red-500">
            <AlertTriangle className="h-15 w-15" />
          </div>

          <div className="text-center">
            <h1 className="text-base sm:text-lg font-semibold text-slate-900">Κάτι δεν πήγε καλά</h1>
            <p className="mt-1 text-xs sm:text-sm text-slate-500">Παρουσιάστηκε ένα απρόσμενο σφάλμα κατά τη φόρτωση των δεδομένων. Παρακαλώ δοκιμάστε ξανά ή ανανεώστε τη σελίδα.</p>
          </div>

          {/* Actions */}
          <div className="mt-1 flex flex-wrap items-center justify-start gap-2">
            <Link href="/" className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-4 py-1.5 text-sm font-medium text-slate-700 shadow-sm hover:border-slate-300 hover:bg-slate-50">
              Αρχική Σελίδα
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BugPage;
