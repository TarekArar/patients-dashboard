"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { ArrowDownAZ, ArrowUpAZ } from "lucide-react";

const sortOptions = [
  { value: "default", label: "Default order" },
  { value: "name_asc", label: "Name (A-Z)" },
  { value: "name_desc", label: "Name (Z-A)" },
  { value: "heartRate_asc", label: "Heart Rate (Low-High)" },
  { value: "heartRate_desc", label: "Heart Rate (High-Low)" },
] as const;

export function PatientsSort() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSort = searchParams.get("sort") || "";

  const updateSort = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== "default") {
      params.set("sort", value);
    } else {
      params.delete("sort");
    }
    router.push(`?${params.toString()}`);
  };

  const getSortIcon = () => {
    if (!currentSort) return null;
    return currentSort.includes("asc") ? (
      <ArrowUpAZ className="h-4 w-4 ml-2" />
    ) : (
      <ArrowDownAZ className="h-4 w-4 ml-2" />
    );
  };

  const getCurrentLabel = () => {
    if (!currentSort) return "Sort by";
    return (
      sortOptions.find((option) => option.value === currentSort)?.label ||
      "Sort by"
    );
  };

  return (
    <Select
      value={currentSort}
      onValueChange={updateSort}
      aria-label="Sort patients list"
    >
      <SelectTrigger
        className="h-10 w-[180px]"
        aria-label="Sort by"
        aria-expanded="false"
        aria-haspopup="listbox"
      >
        <div className="flex items-center">
          <span className="truncate" aria-live="polite">
            {getCurrentLabel()}
          </span>
          {getSortIcon() && (
            <span className="sr-only">
              {currentSort.includes("asc")
                ? "Sorted ascending"
                : "Sorted descending"}
            </span>
          )}
          <span aria-hidden="true">{getSortIcon()}</span>
        </div>
      </SelectTrigger>
      <SelectContent role="listbox">
        {sortOptions.map((option) => (
          <SelectItem key={option.value} value={option.value} role="option">
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
