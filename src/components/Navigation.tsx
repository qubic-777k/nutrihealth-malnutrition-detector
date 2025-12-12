"use client";

import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

export function Navigation() {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    router.push("/");
  };

  if (pathname === "/") return null;

  return (
    <div className="bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-slate-900">NutriHealth</h2>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant={pathname === "/profile" ? "default" : "ghost"}
              size="sm"
              onClick={() => router.push("/profile")}
            >
              Profile
            </Button>
            <Button
              variant={pathname === "/meal-plan" ? "default" : "ghost"}
              size="sm"
              onClick={() => router.push("/meal-plan")}
            >
              Meal Plan
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
            >
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
