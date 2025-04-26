"use client";

import { Drawer, DrawerContent } from "@/components/ui/drawer";
import useDebouncedCallback from "@/hooks/use-debounced-callback";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export function PatientDrawer({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (searchParams.get("patientId")) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [searchParams]);

  const onClose = useDebouncedCallback(() => {
    const params = new URLSearchParams(searchParams);
    params.delete("patientId");
    replace(`${pathname}?${params.toString()}`);
  }, 50);

  return (
    <Drawer
      open={isOpen}
      onClose={() => {
        setIsOpen(false);
        onClose();
      }}
      aria-modal="true"
      aria-label="Patient Details"
    >
      <DrawerContent
        className="w-[33vw]"
        role="region"
        aria-label="Patient Information"
      >
        {children}
      </DrawerContent>
    </Drawer>
  );
}
