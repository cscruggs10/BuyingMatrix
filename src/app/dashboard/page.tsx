"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Dealer {
  id: string;
  full_name: string;
  dealership_name: string;
  email: string;
  city: string;
  state: string;
  dealer_type: string;
}

interface BuyBoxEntry {
  id: string;
  make: string;
  model: string;
  year_min: number;
  year_max: number;
  generation_label: string;
  tiers: { id: string; mileage_min: number; mileage_max: number; max_price: number }[];
}

export default function DashboardPage() {
  const [dealer, setDealer] = useState<Dealer | null>(null);
  const [entries, setEntries] = useState<BuyBoxEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [dealerRes, entriesRes] = await Promise.all([
          fetch("/api/auth/me"),
          fetch("/api/buy-box"),
        ]);
        if (dealerRes.ok) {
          const data = await dealerRes.json();
          setDealer(data.dealer);
        }
        if (entriesRes.ok) {
          const data = await entriesRes.json();
          setEntries(data.entries);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900">Buy Box Builder</h1>
          <span className="text-sm text-gray-600">{dealer?.email}</span>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Welcome, {dealer?.full_name}!
          </h2>
          <p className="text-gray-600">
            {dealer?.dealership_name} — {dealer?.city}, {dealer?.state}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Your Buy Box</h3>
            {entries.length > 0 && (
              <Link
                href="/builder"
                className="text-sm font-medium text-orange-600 hover:text-orange-700"
              >
                Edit Your Buy Box
              </Link>
            )}
          </div>

          {entries.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p className="mb-4">You haven&apos;t created a Buy Box yet.</p>
              <Link
                href="/builder"
                className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-orange-600 rounded-lg hover:bg-orange-700 transition-colors"
              >
                Start Building Your Buy Box
              </Link>
            </div>
          ) : (
            <div>
              <p className="text-sm text-gray-500 mb-4">
                {entries.length} vehicle{entries.length !== 1 ? "s" : ""} in your buy box
              </p>
              <div className="divide-y divide-gray-100">
                {entries.map((entry) => (
                  <div key={entry.id} className="py-3 flex items-center justify-between">
                    <div>
                      <span className="font-medium text-gray-900">
                        {entry.make} {entry.model}
                      </span>
                      <span className="text-gray-500 ml-2 text-sm">
                        {entry.year_min}–{entry.year_max} &middot; {entry.generation_label}
                      </span>
                    </div>
                    <span className="text-xs text-gray-400">
                      {entry.tiers.length} tier{entry.tiers.length !== 1 ? "s" : ""}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
