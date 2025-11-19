"use client";

import { useRefresh } from "@/hooks/useRefresh";
import { useUserStore } from "@/stores/user-store";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { api } from "@/lib/api";

export const publicRoutes = ["/", "/analysis", "/result", "/home", "/on-event", "/on-event/history", "/on-event/analysis", "/on-event/result", "/admin-event", "/admin-event/order-history", "/admin-event/requests"];

export default function ProtectedRoutes({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, setUser } = useUserStore();
  const { isRefreshing: isRefreshingHook } = useRefresh();
  const hasRequestedMe = useRef(false);
    
  useEffect(() => {
    const fetchUserMe = async () => {
      if (hasRequestedMe.current) return;
      
      const cookies = document.cookie.split(';');
      const tokenCookie = cookies.find(cookie => cookie.trim().startsWith('token='));
      const tokenValue = tokenCookie?.split('=')[1]?.trim();
      
      if (tokenCookie && tokenValue && !user.isAuthenticated) {
        hasRequestedMe.current = true;
        try {
          const response = await api.get('/auth/verify', {
            withCredentials: true,
          });          
          if (response.data) {
            if(response.data.authenticated){
              setUser({
                data: {
                  user_id: response.data.userId,
                  session_id: response.data.session_id,
                  token: response.data.token,
                  token_type: response.data.token_type,
                  expires_in: response.data.expires_in,
                  result_code: response.data.result_code,
                  result_message: response.data.result_message
                },
                meta: response.data.meta || { timestamp: new Date().toISOString() },
                isAuthenticated: true
              });
            } 
            else {
              document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
              useUserStore.getState().resetUser();
              if(!publicRoutes.includes(pathname)){
                router.push("/auth/login");
                return;
              }
            }
          }
        } catch (error) {
          console.error('Failed to fetch user data:', error);
          document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
        }
      }
    };

    fetchUserMe();
  }, [user.isAuthenticated, setUser]);

  useEffect(() => {
    const isAuthRoute = pathname.startsWith("/auth");

    if (isRefreshingHook) {
      return;
    }
    if (!user.isAuthenticated && !isAuthRoute && !publicRoutes.includes(pathname)) {
      router.push("/auth/login");
    }
  }, [pathname, user.isAuthenticated, isRefreshingHook, router]);

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
