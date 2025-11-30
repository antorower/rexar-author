import { BookOpen, TrendingUp, Users, FileText } from "lucide-react";
import { TotalBooks } from "@/lib/cache-functions";
import { TotalBooksThisMonth } from "@/lib/cache-functions";
import { GetCurrentUser } from "@/lib/cache-functions";
import Link from "next/link";

const Stats = async () => {
  const totalBooks = await TotalBooks();
  const totalBooksThisMonth = await TotalBooksThisMonth();

  return [
    { icon: BookOpen, label: "Total eBooks", value: totalBooks, change: totalBooksThisMonth > 0 ? `+${totalBooksThisMonth} αυτόν τον μήνα` : "κανένα αυτόν τον μήνα", color: "from-primary to-accent" },
    { icon: Users, label: "Total Readers", value: "2,543", change: "+18% this month", color: "from-accent to-primary" },
    { icon: FileText, label: "Drafts", value: "5", change: "3 ready to publish", color: "from-primary to-accent" },
    { icon: TrendingUp, label: "Revenue", value: "$4,321", change: "+23% this month", color: "from-accent to-primary" },
  ];
};

export default async function Home() {
  const stats = await Stats();
  const user = await GetCurrentUser();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl bg-linear-to-br ${stat.color} flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-accent font-medium">{stat.change}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-card border border-border rounded-2xl p-8 flex flex-col gap-4 items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-primary to-accent mx-auto flex items-center justify-center">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <div className="text-xl font-semibold text-foreground">Δημιουργία Βιβλίου</div>
          <div className="text-muted-foreground max-w-md">Ήξερες ότι μπορείς να δημιουργείς τα δικά σου βιβλία εντελώς δωρεάν και να βγάζεις χρήματα από αυτά;</div>
        </div>
        <Link href="/create" className="bg-blue-600 px-6 py-4 text-white rounded-md hover:bg-blue-700 transition-colors">
          Δημιουργία Νέου Βιβλίου
        </Link>
      </div>
    </div>
  );
}
