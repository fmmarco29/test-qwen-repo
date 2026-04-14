"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.push("/");
      } else {
        setIsChecking(false);
      }
    }
  }, [user, isLoading, router]);

  if (isLoading || isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="animate-pulse text-slate-400 text-lg">Cargando...</div>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen flex">
      <DashboardSidebar />
      <div className="flex-1 ml-64 min-h-screen">
        <DashboardHeader />
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
