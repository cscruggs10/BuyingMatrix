"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { makes } from "@/data/makes";

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

function formatPrice(amount: number): string {
  return "$" + amount.toLocaleString();
}

function formatMileage(miles: number): string {
  return miles.toLocaleString() + " mi";
}

function getLogoPath(makeName: string): string | null {
  const make = makes.find(
    (m) => m.name.toLowerCase() === makeName.toLowerCase()
  );
  return make?.logoPath || null;
}

function getGenerationImage(
  makeName: string,
  modelName: string,
  generationLabel: string
): string | null {
  const make = makes.find(
    (m) => m.name.toLowerCase() === makeName.toLowerCase()
  );
  const model = make?.models.find(
    (m) => m.name.toLowerCase() === modelName.toLowerCase()
  );
  const gen = model?.generations.find((g) => g.label === generationLabel);
  return gen?.imagePath || null;
}

export default function DashboardPage() {
  const [dealer, setDealer] = useState<Dealer | null>(null);
  const [entries, setEntries] = useState<BuyBoxEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

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

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this entry?")) return;
    try {
      const res = await fetch(`/api/buy-box?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setEntries((prev) => prev.filter((e) => e.id !== id));
      }
    } catch (error) {
      console.error("Failed to delete entry:", error);
    }
  }

  function handleCopyShareLink() {
    if (!dealer) return;
    const url = `${window.location.origin}/buy-box/${dealer.id}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

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
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900">Buy Box Builder</h1>
          <span className="text-sm text-gray-600">{dealer?.email}</span>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Welcome, {dealer?.full_name}!
          </h2>
          <p className="text-gray-600">
            {dealer?.dealership_name} — {dealer?.city}, {dealer?.state}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Your Buy Box</h3>
            {entries.length > 0 && (
              <div className="flex items-center gap-3">
                <button
                  onClick={handleCopyShareLink}
                  className="text-sm font-medium text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg px-3 py-1.5 transition-colors"
                >
                  {copied ? "Copied!" : "Copy Share Link"}
                </button>
                <Link
                  href="/builder"
                  className="text-sm font-medium text-orange-600 hover:text-orange-700"
                >
                  Edit Your Buy Box
                </Link>
              </div>
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {entries.map((entry) => {
                  const logoPath = getLogoPath(entry.make);
                  const imagePath = getGenerationImage(
                    entry.make,
                    entry.model,
                    entry.generation_label
                  );

                  return (
                    <div
                      key={entry.id}
                      className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100"
                    >
                      {/* Generation Image */}
                      {imagePath && (
                        <div className="relative w-full aspect-[16/10] bg-gray-100">
                          <img
                            src={imagePath}
                            alt={`${entry.make} ${entry.model}`}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              const fallback = imagePath.replace(".jpg", ".svg");
                              if (target.src !== fallback) target.src = fallback;
                            }}
                          />
                        </div>
                      )}

                      <div className="p-5">
                        {/* Make Logo + Heading */}
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-3">
                            {logoPath && (
                              <div className="relative w-8 h-5 shrink-0">
                                <Image
                                  src={logoPath}
                                  alt={entry.make}
                                  fill
                                  className="object-contain"
                                  unoptimized
                                />
                              </div>
                            )}
                            <h4 className="text-lg font-semibold text-gray-900">
                              {entry.make} {entry.model}
                            </h4>
                          </div>
                          <div className="flex gap-3 shrink-0">
                            <Link
                              href="/builder"
                              className="text-sm font-medium text-orange-600 hover:text-orange-700"
                            >
                              Edit
                            </Link>
                            <button
                              onClick={() => handleDelete(entry.id)}
                              className="text-sm font-medium text-red-600 hover:text-red-700"
                            >
                              Delete
                            </button>
                          </div>
                        </div>

                        {/* Year Range + Generation */}
                        <p className="text-sm text-gray-600 mb-4">
                          {entry.year_min}&ndash;{entry.year_max} &middot;{" "}
                          {entry.generation_label}
                        </p>

                        {/* Tier Table */}
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="text-left text-gray-500 border-b">
                              <th className="pb-2 font-medium">Mileage Range</th>
                              <th className="pb-2 font-medium">Max Price</th>
                            </tr>
                          </thead>
                          <tbody>
                            {entry.tiers.map((tier) => (
                              <tr
                                key={tier.id}
                                className="border-b last:border-0"
                              >
                                <td className="py-2 text-gray-700">
                                  {formatMileage(tier.mileage_min)} &ndash;{" "}
                                  {formatMileage(tier.mileage_max)}
                                </td>
                                <td className="py-2 font-medium text-gray-900">
                                  {formatPrice(tier.max_price)}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
