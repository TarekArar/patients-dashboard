import { Button } from "@/components/ui/button";
import {
  DrawerClose,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { X } from "lucide-react";

export function PatientDetailsSkeleton() {
  return (
    <>
      <DrawerHeader>
        <DrawerTitle className="text-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Skeleton className="h-8 w-40" />
            <Skeleton className="h-6 w-24" />
          </div>

          <DrawerClose asChild>
            <Button variant="outline" className="rounded-full p-0 size-8">
              <X />
            </Button>
          </DrawerClose>
        </DrawerTitle>
        <DrawerDescription>
          <div className="flex gap-4 text-sm mt-2">
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-5 w-32" />
          </div>
        </DrawerDescription>
      </DrawerHeader>

      <div className="px-4">
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Add Note</h3>
            <Skeleton className="h-[100px] w-full" />
            <Skeleton className="h-10 w-24 mt-2" />
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Patient Notes</h3>
            <ScrollArea className="h-[400px] rounded-md border p-4">
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="rounded-lg border p-3 bg-gray-50">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-3 w-32 mt-2" />
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>
    </>
  );
}
