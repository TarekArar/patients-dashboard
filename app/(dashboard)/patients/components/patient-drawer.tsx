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
  }, [searchParams]); // eslint-disable-line react-hooks/exhaustive-dep

  const onClose = useDebouncedCallback(() => {
    const params = new URLSearchParams(searchParams);
    params.delete("patientId");
    replace(`${pathname}?${params.toString()}`);
  }, 200);

  return (
    <Drawer
      open={isOpen}
      onClose={() => {
        setIsOpen(false);
        onClose();
      }}
    >
      <DrawerContent className="w-[33vw]">{children}</DrawerContent>
    </Drawer>
  );
}
