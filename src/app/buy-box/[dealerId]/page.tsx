"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { makes } from "@/data/makes";

interface BuyBoxTier {
  id: string;
  mileage_min: number;
  mileage_max: number;
  max_price: number;
}

interface BuyBoxEntry {
  id: string;
  make: string;
  model: string;
  year_min: number;
  year_max: number;
  generation_label: string;
  tiers: BuyBoxTier[];
}

interface DealerData {
  id: string;
  dealership_name: string;
  city: string;
  state: string;
  dealer_type: string;
  email: string;
  phone: string;
  entries: BuyBoxEntry[];
}

function formatPrice(amount: number): string {
  return "$" + amount.toLocaleString();
}

function formatMileage(miles: number): string {
  return miles.toLocaleString() + " mi";
}

function formatDealerType(type: string): string {
  const map: Record<string, string> = {
    INDEPENDENT: "Independent Dealer",
    FRANCHISE: "Franchise Dealer",
    WHOLESALE: "Wholesale Dealer",
    BHPH: "Buy Here Pay Here",
  };
  return map[type] || type;
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

export default function PublicBuyBoxPage() {
  const params = useParams();
  const dealerId = params.dealerId as string;
  const [dealer, setDealer] = useState<DealerData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBuyBox() {
      try {
        const res = await fetch(`/api/buy-box/${dealerId}`);
        if (res.status === 404) {
          setError("Dealer not found.");
          return;
        }
        if (!res.ok) {
          setError("Something went wrong.");
          return;
        }
        const data = await res.json();
        setDealer(data.dealer);
      } catch {
        setError("Failed to load buy box.");
      } finally {
        setLoading(false);
      }
    }
    fetchBuyBox();
  }, [dealerId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg font-semibold text-gray-700">{error}</p>
          <p className="text-sm text-gray-500 mt-2">
            Check the link and try again.
          </p>
        </div>
      </div>
    );
  }

  if (!dealer) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <h1 className="text-xl font-bold text-gray-900">Buy Box</h1>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* Dealer Info Card */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {dealer.dealership_name}
          </h2>
          <p className="text-gray-600">
            {dealer.city}, {dealer.state} &middot;{" "}
            {formatDealerType(dealer.dealer_type)}
          </p>
          <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-500">
            <span>{dealer.email}</span>
            <span>{dealer.phone}</span>
          </div>
        </div>

        {/* Entries */}
        {dealer.entries.length === 0 ? (
          <div className="bg-white rounded-lg shadow-lg p-6 text-center text-gray-500">
            <p>This dealer hasn&apos;t added any vehicles to their buy box yet.</p>
          </div>
        ) : (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Buying {dealer.entries.length} Vehicle
              {dealer.entries.length !== 1 ? "s" : ""}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {dealer.entries.map((entry) => {
                const logoPath = getLogoPath(entry.make);
                const imagePath = getGenerationImage(
                  entry.make,
                  entry.model,
                  entry.generation_label
                );

                return (
                  <div
                    key={entry.id}
                    className="bg-white rounded-xl shadow-lg overflow-hidden"
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
                      <div className="flex items-center gap-3 mb-2">
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
      </main>
    </div>
  );
}
