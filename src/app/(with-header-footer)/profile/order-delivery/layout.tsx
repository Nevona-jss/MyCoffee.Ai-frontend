"use client";
import React, { useEffect } from "react";
import { useHeaderStore } from "@/stores/header-store";

export default function MyCoffeeLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const { setHeader } = useHeaderStore();

  useEffect(() => {
    setHeader({
      title: "주문/배송 조회",
      showBackButton: true,
      showSettingsButton: false,

    });
  }, []);

  return (
    <>
      {children}
    </>
  );
}
