"use client";

import { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { makes, type Make, type Model, type Generation } from "@/data/makes";

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

type WizardStep = 1 | 2 | 3 | 4;

function formatPrice(amount: number): string {
  return "$" + amount.toLocaleString();
}

function formatMileage(miles: number): string {
  return miles.toLocaleString() + " mi";
}

function displayYearEnd(yearEnd: number): string {
  return yearEnd === 9999 ? "Present" : String(yearEnd);
}

function apiYearEnd(yearEnd: number): number {
  return yearEnd === 9999 ? new Date().getFullYear() : yearEnd;
}

const STEP_LABELS = ["Select Make", "Select Model", "Select Generation", "Configure & Save"];

export default function BuilderPage() {
  // Wizard state
  const [step, setStep] = useState<WizardStep>(1);
  const [selectedMake, setSelectedMake] = useState<Make | null>(null);
  const [selectedModel, setSelectedModel] = useState<Model | null>(null);
  const [selectedGeneration, setSelectedGeneration] = useState<Generation | null>(null);
  const [makeSearch, setMakeSearch] = useState("");

  // Tier form state
  const [tiers, setTiers] = useState<TierFormData[]>([
    { mileage_min: "0", mileage_max: "", max_price: "" },
  ]);
  const [tierErrors, setTierErrors] = useState<Record<string, string>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Existing entries
  const [entries, setEntries] = useState<BuyBoxEntry[]>([]);
  const [loading, setLoading] = useState(true);

  // Edit mode
  const [editingId, setEditingId] = useState<string | null>(null);

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

  // Filter makes by search
  const filteredMakes = useMemo(() => {
    if (!makeSearch.trim()) return makes;
    const q = makeSearch.toLowerCase();
    return makes.filter((m) => m.name.toLowerCase().includes(q));
  }, [makeSearch]);

  // -- Step navigation --
  function goToStep(target: WizardStep) {
    if (target < step) {
      setStep(target);
      if (target <= 3) {
        setSelectedGeneration(null);
        setSaveSuccess(false);
        setApiError(null);
      }
      if (target <= 2) setSelectedModel(null);
      if (target <= 1) {
        setSelectedMake(null);
        setMakeSearch("");
      }
      setEditingId(null);
    }
  }

  function selectMake(make: Make) {
    setSelectedMake(make);
    setSelectedModel(null);
    setSelectedGeneration(null);
    setStep(2);
  }

  function selectModel(model: Model) {
    setSelectedModel(model);
    setSelectedGeneration(null);
    setStep(3);
  }

  function selectGeneration(gen: Generation) {
    setSelectedGeneration(gen);
    setTiers([{ mileage_min: "0", mileage_max: "", max_price: "" }]);
    setTierErrors({});
    setApiError(null);
    setSaveSuccess(false);
    setEditingId(null);
    setStep(4);
  }

  function resetWizard() {
    setStep(1);
    setSelectedMake(null);
    setSelectedModel(null);
    setSelectedGeneration(null);
    setMakeSearch("");
    setTiers([{ mileage_min: "0", mileage_max: "", max_price: "" }]);
    setTierErrors({});
    setApiError(null);
    setSaveSuccess(false);
    setEditingId(null);
  }

  // -- Tier management --
  function handleTierChange(index: number, field: string, value: string) {
    setTiers((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
    const key = `tiers.${index}.${field}`;
    if (tierErrors[key]) {
      setTierErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  }

  function addTier() {
    const lastTier = tiers[tiers.length - 1];
    const nextMin = lastTier?.mileage_max || "0";
    setTiers((prev) => [
      ...prev,
      { mileage_min: nextMin, mileage_max: "", max_price: "" },
    ]);
  }

  function removeTier(index: number) {
    if (tiers.length <= 1) return;
    setTiers((prev) => prev.filter((_, i) => i !== index));
  }

  function validateTiers(): boolean {
    const errors: Record<string, string> = {};
    tiers.forEach((tier, i) => {
      if (!tier.mileage_max.trim()) {
        errors[`tiers.${i}.mileage_max`] = "Required";
      } else if (isNaN(Number(tier.mileage_max))) {
        errors[`tiers.${i}.mileage_max`] = "Must be a number";
      }
      if (!tier.max_price.trim()) {
        errors[`tiers.${i}.max_price`] = "Required";
      } else if (isNaN(Number(tier.max_price)) || Number(tier.max_price) <= 0) {
        errors[`tiers.${i}.max_price`] = "Must be > 0";
      }
      if (
        tier.mileage_min &&
        tier.mileage_max &&
        Number(tier.mileage_min) >= Number(tier.mileage_max)
      ) {
        errors[`tiers.${i}.mileage_max`] = "Must be > min mileage";
      }
    });
    setTierErrors(errors);
    return Object.keys(errors).length === 0;
  }

  async function handleSave() {
    if (!selectedMake || !selectedModel || !selectedGeneration) return;
    if (!validateTiers()) return;

    setIsSaving(true);
    setApiError(null);

    const payload = {
      id: editingId,
      make: selectedMake.name,
      model: selectedModel.name,
      year_min: selectedGeneration.yearStart,
      year_max: apiYearEnd(selectedGeneration.yearEnd),
      generation_label: selectedGeneration.label,
      tiers: tiers.map((t) => ({
        mileage_min: Number(t.mileage_min || 0),
        mileage_max: Number(t.mileage_max),
        max_price: Number(t.max_price),
      })),
    };

    try {
      const isEdit = !!editingId;
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

      setSaveSuccess(true);
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

  function startEdit(entry: BuyBoxEntry) {
    const make = makes.find(
      (m) => m.name.toLowerCase() === entry.make.toLowerCase()
    );
    const model = make?.models.find(
      (m) => m.name.toLowerCase() === entry.model.toLowerCase()
    );
    const gen = model?.generations.find(
      (g) => g.label === entry.generation_label
    );

    if (make && model && gen) {
      setSelectedMake(make);
      setSelectedModel(model);
      setSelectedGeneration(gen);
      setEditingId(entry.id);
      setTiers(
        entry.tiers.map((t) => ({
          mileage_min: String(t.mileage_min),
          mileage_max: String(t.mileage_max),
          max_price: String(t.max_price),
        }))
      );
      setTierErrors({});
      setApiError(null);
      setSaveSuccess(false);
      setStep(4);
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
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900">Buy Box Builder</h1>
          <Link
            href="/dashboard"
            className="text-sm text-orange-600 hover:text-orange-700 font-medium"
          >
            Back to Dashboard
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* Step Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            {STEP_LABELS.map((label, i) => {
              const stepNum = (i + 1) as WizardStep;
              const isActive = step === stepNum;
              const isCompleted = step > stepNum;
              return (
                <div key={i} className="flex items-center">
                  <button
                    onClick={() => isCompleted && goToStep(stepNum)}
                    disabled={!isCompleted}
                    className={`flex items-center gap-2 ${
                      isCompleted
                        ? "cursor-pointer"
                        : "cursor-default"
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                        isActive
                          ? "bg-orange-600 text-white"
                          : isCompleted
                          ? "bg-orange-100 text-orange-700"
                          : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      {isCompleted ? (
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        stepNum
                      )}
                    </div>
                    <span
                      className={`hidden sm:inline text-sm font-medium ${
                        isActive
                          ? "text-orange-700"
                          : isCompleted
                          ? "text-orange-600"
                          : "text-gray-400"
                      }`}
                    >
                      {label}
                    </span>
                  </button>
                  {i < 3 && (
                    <div
                      className={`w-8 sm:w-16 h-0.5 mx-1 sm:mx-2 ${
                        step > stepNum ? "bg-orange-300" : "bg-gray-200"
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Wizard Content */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          {/* Step 1: Select Make */}
          {step === 1 && (
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Select a Make
              </h2>
              <input
                type="text"
                placeholder="Search makes..."
                value={makeSearch}
                onChange={(e) => setMakeSearch(e.target.value)}
                className="w-full px-4 py-2 mb-6 bg-white text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
                {filteredMakes.map((make) => (
                  <button
                    key={make.id}
                    onClick={() => selectMake(make)}
                    className="bg-white rounded-xl shadow-md hover:shadow-lg hover:border-orange-400 border-2 border-transparent transition-all cursor-pointer p-4 flex flex-col items-center gap-2"
                  >
                    <div className="relative w-16 h-10">
                      <Image
                        src={make.logoPath}
                        alt={make.name}
                        fill
                        className="object-contain"
                        unoptimized
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-700 text-center">
                      {make.name}
                    </span>
                  </button>
                ))}
              </div>
              {filteredMakes.length === 0 && (
                <p className="text-center text-gray-400 mt-8">
                  No makes match &quot;{makeSearch}&quot;
                </p>
              )}
            </div>
          )}

          {/* Step 2: Select Model */}
          {step === 2 && selectedMake && (
            <div>
              <button
                onClick={() => goToStep(1)}
                className="flex items-center gap-1 text-orange-600 hover:text-orange-700 text-sm font-medium mb-4"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                Back to Makes
              </button>
              <div className="flex items-center gap-3 mb-6">
                <div className="relative w-10 h-6">
                  <Image
                    src={selectedMake.logoPath}
                    alt={selectedMake.name}
                    fill
                    className="object-contain"
                    unoptimized
                  />
                </div>
                <h2 className="text-lg font-semibold text-gray-900">
                  {selectedMake.name} Models
                </h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {selectedMake.models.map((model) => (
                  <button
                    key={model.id}
                    onClick={() => selectModel(model)}
                    className="bg-white rounded-xl shadow-md hover:shadow-lg hover:border-orange-400 border-2 border-transparent transition-all cursor-pointer p-5 text-left"
                  >
                    <p className="text-base font-semibold text-gray-900">
                      {model.name}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {model.generations.length} generation
                      {model.generations.length !== 1 ? "s" : ""}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Select Generation */}
          {step === 3 && selectedMake && selectedModel && (
            <div>
              <button
                onClick={() => goToStep(2)}
                className="flex items-center gap-1 text-orange-600 hover:text-orange-700 text-sm font-medium mb-4"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                Back to Models
              </button>
              <div className="flex items-center gap-3 mb-6">
                <div className="relative w-10 h-6">
                  <Image
                    src={selectedMake.logoPath}
                    alt={selectedMake.name}
                    fill
                    className="object-contain"
                    unoptimized
                  />
                </div>
                <h2 className="text-lg font-semibold text-gray-900">
                  {selectedMake.name} {selectedModel.name} &mdash; Generations
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {selectedModel.generations.map((gen) => {
                  const imgSrc = gen.imagePath.replace(".jpg", ".svg");
                  return (
                    <button
                      key={gen.label}
                      onClick={() => selectGeneration(gen)}
                      className="bg-white rounded-xl shadow-md hover:shadow-lg hover:border-orange-400 border-2 border-transparent transition-all cursor-pointer overflow-hidden text-left"
                    >
                      <div className="relative w-full aspect-[16/10] bg-gray-100">
                        <Image
                          src={imgSrc}
                          alt={`${selectedModel.name} ${gen.label}`}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                      <div className="p-4">
                        <p className="text-sm font-bold text-gray-900">
                          {gen.label}
                        </p>
                        <p className="text-xs text-gray-500 mt-0.5">
                          {gen.yearStart}&ndash;{displayYearEnd(gen.yearEnd)}
                        </p>
                        <p
                          className="text-xs text-gray-400 mt-2 line-clamp-2"
                          title={gen.notes}
                        >
                          {gen.notes}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 4: Configure Tiers & Save */}
          {step === 4 && selectedMake && selectedModel && selectedGeneration && (
            <div>
              <button
                onClick={() => goToStep(3)}
                className="flex items-center gap-1 text-orange-600 hover:text-orange-700 text-sm font-medium mb-4"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                Back to Generations
              </button>

              {/* Selection Summary */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-6 shrink-0">
                    <Image
                      src={selectedMake.logoPath}
                      alt={selectedMake.name}
                      fill
                      className="object-contain"
                      unoptimized
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      {selectedMake.name} {selectedModel.name}
                    </p>
                    <p className="text-sm text-gray-600">
                      {selectedGeneration.label} &middot;{" "}
                      {selectedGeneration.yearStart}&ndash;
                      {displayYearEnd(selectedGeneration.yearEnd)}
                    </p>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  {selectedGeneration.notes}
                </p>
              </div>

              {saveSuccess ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {editingId ? "Entry Updated!" : "Entry Saved!"}
                  </h3>
                  <p className="text-sm text-gray-500 mb-6">
                    Your buy box entry has been {editingId ? "updated" : "saved"} successfully.
                  </p>
                  <div className="flex gap-3 justify-center">
                    <button
                      onClick={resetWizard}
                      className="px-6 py-3 text-base font-medium text-white bg-orange-600 rounded-lg hover:bg-orange-700 transition-colors"
                    >
                      Add Another Vehicle
                    </button>
                    <Link
                      href="/dashboard"
                      className="px-6 py-3 text-base font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                      Go to Dashboard
                    </Link>
                  </div>
                </div>
              ) : (
                <div>
                  {apiError && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                      <p className="text-sm text-red-600">{apiError}</p>
                    </div>
                  )}

                  <h3 className="text-sm font-semibold text-gray-900 mb-3">
                    Mileage / Price Tiers
                  </h3>
                  {tiers.map((tier, index) => (
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
                        {tierErrors[`tiers.${index}.mileage_max`] && (
                          <p className="mt-1 text-xs text-red-600">
                            {tierErrors[`tiers.${index}.mileage_max`]}
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
                        {tierErrors[`tiers.${index}.max_price`] && (
                          <p className="mt-1 text-xs text-red-600">
                            {tierErrors[`tiers.${index}.max_price`]}
                          </p>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => removeTier(index)}
                        disabled={tiers.length <= 1}
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
                    className="text-sm font-medium text-orange-600 hover:text-orange-700 mb-6"
                  >
                    + Add Tier
                  </button>

                  <div className="flex gap-3 mt-4">
                    <button
                      onClick={handleSave}
                      disabled={isSaving}
                      className="px-6 py-3 text-base font-medium text-white bg-orange-600 rounded-lg hover:bg-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSaving
                        ? "Saving..."
                        : editingId
                        ? "Update Entry"
                        : "Save to Buy Box"}
                    </button>
                    <button
                      onClick={resetWizard}
                      disabled={isSaving}
                      className="px-6 py-3 text-base font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Existing Entries */}
        {entries.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Your Buy Box Entries ({entries.length})
            </h2>
            {entries.map((entry) => (
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
                      {entry.year_min}&ndash;{entry.year_max} &middot;{" "}
                      {entry.generation_label}
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => startEdit(entry)}
                      className="text-sm font-medium text-orange-600 hover:text-orange-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(entry.id)}
                      className="text-sm font-medium text-red-600 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
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
            ))}
          </div>
        )}

        {entries.length === 0 && step === 1 && (
          <div className="text-center text-gray-400 py-4">
            <p>No entries yet. Select a make above to start building your buy box.</p>
          </div>
        )}
      </main>
    </div>
  );
}
