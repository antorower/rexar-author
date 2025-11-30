import Image from "next/image";
import { Tag, Euro, CheckCircle2, Clock3 } from "lucide-react";
import Link from "next/link";

function StatusBadge({ status }) {
  const isPublic = status === "public";
  return (
    <span className={`inline-flex absolute top-4 left-4 items-center gap-1 rounded-full px-2 py-1 text-[11px] font-medium ${isPublic ? "bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200" : "bg-amber-100 text-amber-700 ring-1 ring-amber-200"}`}>
      {isPublic ? <CheckCircle2 className="h-3.5 w-3.5" /> : <Clock3 className="h-3.5 w-3.5" />}
      {isPublic ? "Δημόσιο" : "Πρόχειρο"}
    </span>
  );
}

function Price({ price }) {
  return (
    <div className="flex text-sm absolute top-4 right-4 items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-blue-700 font-semibold">
      {price && <Euro className="h-4 w-4" />}
      {price ? `${price.toFixed(2)}` : "free"}
    </div>
  );
}

const BookCard = ({ book }) => {
  const cover = book.cover || "/default-cover.webp";
  const description = Array.isArray(book.description) && book.description.length > 0 ? book.description[0] : "";

  return (
    <Link href={`/book/${book.slug}`} className="group relative flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
      {/* Cover */}
      <div className="relative w-full pt-[60%] overflow-hidden bg-slate-100">
        <Image src={cover} alt={book.title} fill sizes="(min-width: 1024px) 260px, (min-width: 768px) 33vw, 50vw" className="object-cover transition-transform duration-300 group-hover:scale-[1.03]" />
      </div>

      <StatusBadge status={book.status} />
      <Price price={book.price} />

      <div className="flex flex-1 flex-col gap-3 px-4 pb-4 pt-3">
        <div className="flex items-start justify-between gap-2 pb-2 border-b border-gray-200">
          <h2 className="line-clamp-2 text-base text-start font-semibold leading-snug text-slate-900">{book.title}</h2>
        </div>

        {description && <p className="line-clamp-3 text-start text-sm text-slate-600">{description}</p>}

        <div className="inline-flex text-sm items-center justify-start gap-2 text-gray-500">
          <Tag className="h-3.5 w-3.5" />
          {book.category || "Χωρίς κατηγορία"}
        </div>
      </div>
    </Link>
  );
};

export default BookCard;
