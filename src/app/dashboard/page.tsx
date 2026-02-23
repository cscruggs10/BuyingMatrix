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

export default function DashboardPage() {
  const [dealer, setDealer] = useState<Dealer | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDealer() {
      try {
        const res = await fetch("/api/auth/me");
        if (res.ok) {
          const data = await res.json();
          setDealer(data.dealer);
        }
      } catch (error) {
        console.error("Failed to fetch dealer:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchDealer();
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
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Buy Box</h3>

          <div className="text-center py-8 text-gray-500">
            <p className="mb-4">You haven&apos;t created a Buy Box yet.</p>
            <Link
              href="/builder"
              className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-orange-600 rounded-lg hover:bg-orange-700 transition-colors"
            >
              Start Building Your Buy Box
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
