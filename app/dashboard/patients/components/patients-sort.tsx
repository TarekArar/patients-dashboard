"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { ArrowDownAZ, ArrowUpAZ } from "lucide-react";

export function PatientsSort() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get current sort value from URL
  const currentSort = searchParams.get("sort") || "";

  // Update sort
  const updateSort = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    params.delete("patientId");

    if (value && value !== "default") {
      params.set("sort", value);
    } else {
      params.delete("sort");
    }

    router.push(`?${params.toString()}`);
  };

  // Get sort icon based on current sort
  const getSortIcon = () => {
    if (!currentSort) return null;

    if (currentSort.includes("asc")) {
      return <ArrowUpAZ className="h-4 w-4 ml-2" />;
    } else {
      return <ArrowDownAZ className="h-4 w-4 ml-2" />;
    }
  };

  return (
    <Select value={currentSort} onValueChange={updateSort}>
      <SelectTrigger className="h-10 w-[180px]">
        <div className="flex items-center">
          <span className="truncate">
            {!currentSort && "Sort by"}
            {currentSort === "name_asc" && "Name (A-Z)"}
            {currentSort === "name_desc" && "Name (Z-A)"}
            {currentSort === "heartRate_asc" && "Heart Rate (Low-High)"}
            {currentSort === "heartRate_desc" && "Heart Rate (High-Low)"}
          </span>
          {getSortIcon()}
        </div>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="default">Default order</SelectItem>
        <SelectItem value="name_asc">Name (A-Z)</SelectItem>
        <SelectItem value="name_desc">Name (Z-A)</SelectItem>
        <SelectItem value="heartRate_asc">Heart Rate (Low-High)</SelectItem>
        <SelectItem value="heartRate_desc">Heart Rate (High-Low)</SelectItem>
      </SelectContent>
    </Select>
  );
}
