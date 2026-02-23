"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const DEALER_TYPES = [
  { value: "INDEPENDENT", label: "Independent" },
  { value: "FRANCHISE", label: "Franchise" },
  { value: "WHOLESALE", label: "Wholesaler" },
  { value: "BHPH", label: "Buy Here Pay Here" },
];

const US_STATES = [
  "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
  "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
  "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
  "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
  "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY",
];

export default function RegisterPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setFieldErrors({});

    const formData = new FormData(e.currentTarget);
    const data = {
      full_name: formData.get("full_name") as string,
      dealership_name: formData.get("dealership_name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      city: formData.get("city") as string,
      state: formData.get("state") as string,
      dealer_type: formData.get("dealer_type") as string,
    };

    // Client-side validation
    const errors: Record<string, string> = {};
    if (!data.full_name.trim()) errors.full_name = "Full name is required";
    if (!data.dealership_name.trim()) errors.dealership_name = "Dealership name is required";
    if (!data.email.trim()) errors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = "Invalid email format";
    if (!data.phone.trim()) errors.phone = "Phone number is required";
    if (!data.city.trim()) errors.city = "City is required";
    if (!data.state) errors.state = "State is required";
    if (!data.dealer_type) errors.dealer_type = "Dealer type is required";

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await fetch("/api/dealers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.status === 409) {
        setError("This email is already registered. Please log in instead.");
        setIsSubmitting(false);
        return;
      }

      if (!res.ok) {
        const errorData = await res.json();
        setError(errorData.error || "Something went wrong. Please try again.");
        setIsSubmitting(false);
        return;
      }

      router.push("/builder");
    } catch {
      setError("Network error. Please check your connection and try again.");
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h1 className="text-center text-3xl font-bold text-gray-900">
          Build Your Vehicle Buy Box
        </h1>
        <p className="mt-2 text-center text-gray-600">
          Create your account to get started
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-lg rounded-lg sm:px-10">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="full_name" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                name="full_name"
                id="full_name"
                autoComplete="name"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
              />
              {fieldErrors.full_name && (
                <p className="mt-1 text-sm text-red-600">{fieldErrors.full_name}</p>
              )}
            </div>

            <div>
              <label htmlFor="dealership_name" className="block text-sm font-medium text-gray-700">
                Dealership Name
              </label>
              <input
                type="text"
                name="dealership_name"
                id="dealership_name"
                autoComplete="organization"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
              />
              {fieldErrors.dealership_name && (
                <p className="mt-1 text-sm text-red-600">{fieldErrors.dealership_name}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                autoComplete="email"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
              />
              {fieldErrors.email && (
                <p className="mt-1 text-sm text-red-600">{fieldErrors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                id="phone"
                autoComplete="tel"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
              />
              {fieldErrors.phone && (
                <p className="mt-1 text-sm text-red-600">{fieldErrors.phone}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  id="city"
                  autoComplete="address-level2"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                />
                {fieldErrors.city && (
                  <p className="mt-1 text-sm text-red-600">{fieldErrors.city}</p>
                )}
              </div>

              <div>
                <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                  State
                </label>
                <select
                  name="state"
                  id="state"
                  autoComplete="address-level1"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select...
                  </option>
                  {US_STATES.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
                {fieldErrors.state && (
                  <p className="mt-1 text-sm text-red-600">{fieldErrors.state}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="dealer_type" className="block text-sm font-medium text-gray-700">
                Dealer Type
              </label>
              <select
                name="dealer_type"
                id="dealer_type"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                defaultValue=""
              >
                <option value="" disabled>
                  Select your dealer type...
                </option>
                {DEALER_TYPES.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
              {fieldErrors.dealer_type && (
                <p className="mt-1 text-sm text-red-600">{fieldErrors.dealer_type}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="font-medium text-orange-600 hover:text-orange-500">
              Log in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
