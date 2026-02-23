import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 flex flex-col items-center justify-center px-4">
      <main className="max-w-2xl mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
          Vehicle Buy Box Builder
        </h1>
        <p className="text-xl text-slate-300 mb-8">
          Build your personalized vehicle purchasing criteria in minutes — free.
        </p>
        <p className="text-slate-400 mb-12 max-w-lg mx-auto">
          Define exactly what vehicles you want to buy, at what price points,
          and get a professional PDF to share with wholesalers, runners, and auction reps.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/register"
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-orange-600 rounded-lg hover:bg-orange-700 transition-colors"
          >
            Build Your Buy Box
          </Link>
          <Link
            href="/login"
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-slate-300 border border-slate-600 rounded-lg hover:bg-slate-700 transition-colors"
          >
            Log In
          </Link>
        </div>

        <p className="mt-16 text-sm text-slate-500">
          Powered by Deal Machine / i Finance LLC — Memphis, TN
        </p>
      </main>
    </div>
  );
}
