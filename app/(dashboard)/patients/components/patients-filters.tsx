"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PatientStatus } from "../types";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Slider } from "@/components/ui/slider";

export function PatientsFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get current filter values from URL
  const currentStatus = searchParams.get("status") || "";
  const currentMinAge = searchParams.get("minAge") || "0";
  const currentMaxAge = searchParams.get("maxAge") || "100";

  // Parse age values with fallbacks
  const minAge = Number.parseInt(currentMinAge) || 0;
  const maxAge = Number.parseInt(currentMaxAge) || 100;

  // Update URL with new params
  const updateFilters = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value && (name !== "status" || value !== "all")) {
      params.set(name, value);
    } else {
      params.delete(name);
    }

    router.push(`?${params.toString()}`);
  };

  // Update age range
  const updateAgeRange = (values: number[]) => {
    if (values.length === 2) {
      const [min, max] = values;
      const params = new URLSearchParams(searchParams.toString());

      // Only set min age if it's not the default (0)
      if (min > 0) {
        params.set("minAge", min.toString());
      } else {
        params.delete("minAge");
      }

      // Only set max age if it's not the default (100)
      if (max < 100) {
        params.set("maxAge", max.toString());
      } else {
        params.delete("maxAge");
      }

      router.push(`?${params.toString()}`);
    }
  };

  // Reset all filters
  const resetFilters = () => {
    router.push("");
  };

  // Check if any filter is active
  const isFilterActive = currentStatus || minAge > 0 || maxAge < 100;

  return (
    <div className="bg-white p-4 rounded-lg border mb-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium">Filter Patients</h2>
        {isFilterActive && (
          <Button
            variant="outline"
            size="sm"
            onClick={resetFilters}
            className="flex items-center gap-1"
          >
            <X className="h-4 w-4" />
            Clear filters
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select
            value={currentStatus}
            onValueChange={(value) => updateFilters("status", value)}
          >
            <SelectTrigger id="status">
              <SelectValue placeholder="All statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              <SelectItem value={PatientStatus.Stable}>Stable</SelectItem>
              <SelectItem value={PatientStatus.NeedsAttention}>
                Needs Attention
              </SelectItem>
              <SelectItem value={PatientStatus.Critical}>Critical</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Label>Age Range</Label>
            <span className="text-sm text-gray-500">
              {minAge} - {maxAge} years
            </span>
          </div>

          <Slider
            defaultValue={[minAge, maxAge]}
            min={0}
            max={100}
            step={1}
            minStepsBetweenThumbs={1}
            onValueCommit={updateAgeRange}
            className="py-4"
          />

          <div className="flex justify-between text-xs text-gray-500">
            <span>0</span>
            <span>50</span>
            <span>100</span>
          </div>
        </div>
      </div>
    </div>
  );
}
