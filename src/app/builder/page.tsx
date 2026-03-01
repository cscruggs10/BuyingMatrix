"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface BuyBoxTier {
  id?: string;
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
  updated_at: string;
}

interface TierFormData {
  mileage_min: string;
  mileage_max: string;
  max_price: string;
}

interface EntryFormData {
  make: string;
  model: string;
  year_min: string;
  year_max: string;
  generation_label: string;
  tiers: TierFormData[];
}

function emptyFormData(): EntryFormData {
  return {
    make: "",
    model: "",
    year_min: "",
    year_max: "",
    generation_label: "",
    tiers: [{ mileage_min: "0", mileage_max: "", max_price: "" }],
  };
}

function formatPrice(amount: number): string {
  return "$" + amount.toLocaleString();
}

function formatMileage(miles: number): string {
  return miles.toLocaleString() + " mi";
}

export default function BuilderPage() {
  const [entries, setEntries] = useState<BuyBoxEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [formMode, setFormMode] = useState<"idle" | "add" | "edit">("idle");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<EntryFormData>(emptyFormData());
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchEntries() {
      try {
        const res = await fetch("/api/buy-box");
        if (res.ok) {
          const data = await res.json();
          setEntries(data.entries);
        }
      } catch (error) {
        console.error("Failed to fetch entries:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchEntries();
  }, []);

  function handleFieldChange(field: keyof EntryFormData, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  }

  function handleTierChange(index: number, field: string, value: string) {
    setFormData((prev) => {
      const tiers = [...prev.tiers];
      tiers[index] = { ...tiers[index], [field]: value };
      return { ...prev, tiers };
    });
    const errorKey = `tiers.${index}.${field}`;
    if (errors[errorKey]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[errorKey];
        return next;
      });
    }
  }

  function addTier() {
    const lastTier = formData.tiers[formData.tiers.length - 1];
    const nextMin = lastTier?.mileage_max || "0";
    setFormData((prev) => ({
      ...prev,
      tiers: [
        ...prev.tiers,
        { mileage_min: nextMin, mileage_max: "", max_price: "" },
      ],
    }));
  }

  function removeTier(index: number) {
    if (formData.tiers.length <= 1) return;
    setFormData((prev) => ({
      ...prev,
      tiers: prev.tiers.filter((_, i) => i !== index),
    }));
  }

  function startAdd() {
    setFormMode("add");
    setEditingId(null);
    setFormData(emptyFormData());
    setErrors({});
    setApiError(null);
  }

  function startEdit(entry: BuyBoxEntry) {
    setFormMode("edit");
    setEditingId(entry.id);
    setFormData({
      make: entry.make,
      model: entry.model,
      year_min: String(entry.year_min),
      year_max: String(entry.year_max),
      generation_label: entry.generation_label,
      tiers: entry.tiers.map((t) => ({
        mileage_min: String(t.mileage_min),
        mileage_max: String(t.mileage_max),
        max_price: String(t.max_price),
      })),
    });
    setErrors({});
    setApiError(null);
  }

  function cancelForm() {
    setFormMode("idle");
    setEditingId(null);
    setFormData(emptyFormData());
    setErrors({});
    setApiError(null);
  }

  function validate(): boolean {
    const newErrors: Record<string, string> = {};

    if (!formData.make.trim()) newErrors.make = "Make is required";
    if (!formData.model.trim()) newErrors.model = "Model is required";
    if (!formData.year_min.trim()) {
      newErrors.year_min = "Required";
    } else if (isNaN(Number(formData.year_min))) {
      newErrors.year_min = "Must be a number";
    }
    if (!formData.year_max.trim()) {
      newErrors.year_max = "Required";
    } else if (isNaN(Number(formData.year_max))) {
      newErrors.year_max = "Must be a number";
    }
    if (
      formData.year_min &&
      formData.year_max &&
      Number(formData.year_min) > Number(formData.year_max)
    ) {
      newErrors.year_max = "Must be >= min year";
    }
    if (!formData.generation_label.trim())
      newErrors.generation_label = "Generation label is required";

    formData.tiers.forEach((tier, i) => {
      if (!tier.mileage_max.trim()) {
        newErrors[`tiers.${i}.mileage_max`] = "Required";
      } else if (isNaN(Number(tier.mileage_max))) {
        newErrors[`tiers.${i}.mileage_max`] = "Must be a number";
      }
      if (!tier.max_price.trim()) {
        newErrors[`tiers.${i}.max_price`] = "Required";
      } else if (isNaN(Number(tier.max_price)) || Number(tier.max_price) <= 0) {
        newErrors[`tiers.${i}.max_price`] = "Must be > 0";
      }
      if (
        tier.mileage_min &&
        tier.mileage_max &&
        Number(tier.mileage_min) >= Number(tier.mileage_max)
      ) {
        newErrors[`tiers.${i}.mileage_max`] = "Must be > min mileage";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSave() {
    if (!validate()) return;

    setIsSaving(true);
    setApiError(null);

    const payload = {
      id: editingId,
      make: formData.make,
      model: formData.model,
      year_min: Number(formData.year_min),
      year_max: Number(formData.year_max),
      generation_label: formData.generation_label,
      tiers: formData.tiers.map((t) => ({
        mileage_min: Number(t.mileage_min || 0),
        mileage_max: Number(t.mileage_max),
        max_price: Number(t.max_price),
      })),
    };

    try {
      const isEdit = formMode === "edit";
      const res = await fetch("/api/buy-box", {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        setApiError(data.error || "Something went wrong");
        setIsSaving(false);
        return;
      }

      const data = await res.json();

      if (isEdit) {
        setEntries((prev) =>
          prev.map((e) => (e.id === editingId ? data.entry : e))
        );
      } else {
        setEntries((prev) => [data.entry, ...prev]);
      }

      cancelForm();
    } catch {
      setApiError("Network error. Please try again.");
    } finally {
      setIsSaving(false);
    }
  }

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
          <Link
            href="/dashboard"
            className="text-sm text-orange-600 hover:text-orange-700 font-medium"
          >
            Back to Dashboard
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Add Entry Button */}
        {formMode === "idle" && (
          <button
            onClick={startAdd}
            className="mb-6 inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-orange-600 rounded-lg hover:bg-orange-700 transition-colors"
          >
            + Add New Entry
          </button>
        )}

        {/* Add Form */}
        {formMode === "add" && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6 border-2 border-orange-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Add New Entry
            </h3>
            {renderForm()}
          </div>
        )}

        {/* Entries List */}
        {entries.length === 0 && formMode === "idle" ? (
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <p className="text-gray-500 mb-4">
              No entries yet. Start building your buy box!
            </p>
            <button
              onClick={startAdd}
              className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-orange-600 rounded-lg hover:bg-orange-700 transition-colors"
            >
              Add Your First Entry
            </button>
          </div>
        ) : (
          entries.map((entry) =>
            formMode === "edit" && editingId === entry.id ? (
              <div
                key={entry.id}
                className="bg-white rounded-lg shadow-lg p-6 mb-4 border-2 border-orange-200"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Edit Entry
                </h3>
                {renderForm()}
              </div>
            ) : (
              <div
                key={entry.id}
                className="bg-white rounded-lg shadow-lg p-6 mb-4"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {entry.make} {entry.model}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {entry.year_min}–{entry.year_max} &middot;{" "}
                      {entry.generation_label}
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => startEdit(entry)}
                      disabled={formMode !== "idle"}
                      className="text-sm font-medium text-orange-600 hover:text-orange-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(entry.id)}
                      disabled={formMode !== "idle"}
                      className="text-sm font-medium text-red-600 hover:text-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                {/* Tiers Table */}
                <div className="mt-4 overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left text-gray-500 border-b">
                        <th className="pb-2 font-medium">Mileage Range</th>
                        <th className="pb-2 font-medium">Max Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {entry.tiers.map((tier, i) => (
                        <tr key={tier.id || i} className="border-b last:border-0">
                          <td className="py-2 text-gray-700">
                            {formatMileage(tier.mileage_min)} –{" "}
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
            )
          )
        )}
      </main>
    </div>
  );

  function renderForm() {
    return (
      <div>
        {apiError && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-600">{apiError}</p>
          </div>
        )}

        {/* Make & Model */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Make
            </label>
            <input
              type="text"
              value={formData.make}
              onChange={(e) => handleFieldChange("make", e.target.value)}
              placeholder="e.g. Honda"
              className="mt-1 block w-full px-3 py-2 bg-white text-gray-900 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
            />
            {errors.make && (
              <p className="mt-1 text-sm text-red-600">{errors.make}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Model
            </label>
            <input
              type="text"
              value={formData.model}
              onChange={(e) => handleFieldChange("model", e.target.value)}
              placeholder="e.g. Civic"
              className="mt-1 block w-full px-3 py-2 bg-white text-gray-900 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
            />
            {errors.model && (
              <p className="mt-1 text-sm text-red-600">{errors.model}</p>
            )}
          </div>
        </div>

        {/* Year Range */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Year Min
            </label>
            <input
              type="number"
              value={formData.year_min}
              onChange={(e) => handleFieldChange("year_min", e.target.value)}
              placeholder="e.g. 2018"
              className="mt-1 block w-full px-3 py-2 bg-white text-gray-900 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
            />
            {errors.year_min && (
              <p className="mt-1 text-sm text-red-600">{errors.year_min}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Year Max
            </label>
            <input
              type="number"
              value={formData.year_max}
              onChange={(e) => handleFieldChange("year_max", e.target.value)}
              placeholder="e.g. 2023"
              className="mt-1 block w-full px-3 py-2 bg-white text-gray-900 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
            />
            {errors.year_max && (
              <p className="mt-1 text-sm text-red-600">{errors.year_max}</p>
            )}
          </div>
        </div>

        {/* Generation Label */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">
            Generation Label
          </label>
          <input
            type="text"
            value={formData.generation_label}
            onChange={(e) =>
              handleFieldChange("generation_label", e.target.value)
            }
            placeholder="e.g. 10th Gen, FK8, XV70"
            className="mt-1 block w-full px-3 py-2 bg-white text-gray-900 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
          />
          {errors.generation_label && (
            <p className="mt-1 text-sm text-red-600">
              {errors.generation_label}
            </p>
          )}
        </div>

        {/* Tiers */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-900 mb-3">
            Mileage / Price Tiers
          </h4>
          {formData.tiers.map((tier, index) => (
            <div
              key={index}
              className="grid grid-cols-[1fr_1fr_1fr_auto] gap-3 items-end mb-3"
            >
              <div>
                {index === 0 && (
                  <label className="block text-xs font-medium text-gray-500 mb-1">
                    Min Miles
                  </label>
                )}
                <input
                  type="number"
                  value={tier.mileage_min}
                  onChange={(e) =>
                    handleTierChange(index, "mileage_min", e.target.value)
                  }
                  placeholder="0"
                  className="block w-full px-3 py-2 bg-white text-gray-900 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
              <div>
                {index === 0 && (
                  <label className="block text-xs font-medium text-gray-500 mb-1">
                    Max Miles
                  </label>
                )}
                <input
                  type="number"
                  value={tier.mileage_max}
                  onChange={(e) =>
                    handleTierChange(index, "mileage_max", e.target.value)
                  }
                  placeholder="50000"
                  className="block w-full px-3 py-2 bg-white text-gray-900 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                />
                {errors[`tiers.${index}.mileage_max`] && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors[`tiers.${index}.mileage_max`]}
                  </p>
                )}
              </div>
              <div>
                {index === 0 && (
                  <label className="block text-xs font-medium text-gray-500 mb-1">
                    Max Price ($)
                  </label>
                )}
                <input
                  type="number"
                  value={tier.max_price}
                  onChange={(e) =>
                    handleTierChange(index, "max_price", e.target.value)
                  }
                  placeholder="15000"
                  className="block w-full px-3 py-2 bg-white text-gray-900 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                />
                {errors[`tiers.${index}.max_price`] && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors[`tiers.${index}.max_price`]}
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={() => removeTier(index)}
                disabled={formData.tiers.length <= 1}
                className="px-3 py-2 text-red-500 hover:text-red-700 disabled:text-gray-300 disabled:cursor-not-allowed"
                title="Remove tier"
              >
                &times;
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addTier}
            className="text-sm font-medium text-orange-600 hover:text-orange-700"
          >
            + Add Tier
          </button>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="px-6 py-3 text-base font-medium text-white bg-orange-600 rounded-lg hover:bg-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSaving ? "Saving..." : "Save Entry"}
          </button>
          <button
            onClick={cancelForm}
            disabled={isSaving}
            className="px-6 py-3 text-base font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }
}
