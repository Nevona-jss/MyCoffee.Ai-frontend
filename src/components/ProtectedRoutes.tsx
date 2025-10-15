"use client";

import { useRefresh } from "@/hooks/useRefresh";
import { useUserStore } from "@/stores/user-store";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoutes({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useUserStore();
  const { isRefreshing: isRefreshingHook } = useRefresh();
  
  useEffect(() => {
    const publicRoutes = ["/", "/analysis", "/result"];
    const isAuthRoute = pathname.startsWith("/auth");

    if (isRefreshingHook) {
      return;
    }
    if (!user.isAuthenticated && !isAuthRoute && !publicRoutes.includes(pathname)) {
      router.replace("/auth/login");
    }
  }, [pathname, user.isAuthenticated, isRefreshingHook, router]);

  const publicRoutes = ["/", "/analysis", "/result"];
  const isAuthRoute = pathname.startsWith("/auth");
  const isPublic = isAuthRoute || publicRoutes.includes(pathname);

  if (isRefreshingHook && !isPublic) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="loading-spinner"></div>
        </div>
      </div>
    );
  }

  if (!user.isAuthenticated && !isPublic) {
    return null;
  }

  return <>{children}</>;
}
