"use client";

import { motion } from "framer-motion";
import { BookOpen, TrendingUp, Users, FileText } from "lucide-react";

const stats = [
  { icon: BookOpen, label: "Total eBooks", value: "12", change: "+2 this month", color: "from-primary to-accent" },
  { icon: Users, label: "Total Readers", value: "2,543", change: "+18% this month", color: "from-accent to-primary" },
  { icon: FileText, label: "Drafts", value: "5", change: "3 ready to publish", color: "from-primary to-accent" },
  { icon: TrendingUp, label: "Revenue", value: "$4,321", change: "+23% this month", color: "from-accent to-primary" },
];

export default function Home() {
  return (
    <>
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">Welcome back, John 👋</h1>
        <p className="text-muted-foreground text-lg">{"Here's what's happening with your ebooks today"}</p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
      </motion.div>

      {/* Placeholder Content Area */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-card border border-border rounded-2xl p-8 min-h-[400px] flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-primary to-accent mx-auto flex items-center justify-center">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-foreground">Δημιουργία Περιεχομένου</h3>
          <p className="text-muted-foreground max-w-md">Δημιούργησε το δικό σου learning path ή δόμησε ένα από τα υφιστάμενα learning blocks</p>
        </div>
      </motion.div>
    </>
  );
}
