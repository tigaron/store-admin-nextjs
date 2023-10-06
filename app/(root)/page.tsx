"use client";

import { useEffect } from "react";
import { UserButton } from "@clerk/nextjs";

import { useStoreModal } from "@/hooks/use-store-modal";

export default function RootPage() {
  const onOpen = useStoreModal((state) => state.onOpen);
  const isOpen = useStoreModal((state) => state.isOpen);

  useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);

  return (
    <div>
      Root Page
      <UserButton afterSignOutUrl="/" />
    </div>
  );
}
