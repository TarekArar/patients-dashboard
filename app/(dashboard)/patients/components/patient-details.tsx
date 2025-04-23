import { Button } from "@/components/ui/button";
import {
  DrawerClose,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { PatientDrawer } from "./patient-drawer";
import { getPatient } from "../api";

export async function PatientDetails({ patientId }: { patientId: string }) {
  const { data: patient } = await getPatient(patientId);

  return (
    <PatientDrawer>
      <DrawerHeader>
        <DrawerTitle className="text-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            {patient.name}
            <Badge
              variant="outline"
              className={
                patient.status === "stable"
                  ? "bg-green-50 text-green-700 border-green-200"
                  : patient.status === "critical"
                  ? "bg-red-50 text-red-700 border-red-200"
                  : "bg-yellow-50 text-yellow-700 border-yellow-200"
              }
            >
              {patient.status}
            </Badge>
          </div>

          <DrawerClose asChild>
            <Button variant="outline" className="rounded-full p-0 size-8">
              <X />
            </Button>
          </DrawerClose>
        </DrawerTitle>
        <DrawerDescription>
          <div className="flex gap-4 text-sm mt-2">
            <span>Age: {patient.age}</span>
            <span>Heart Rate: {patient.heartRate} bpm</span>
          </div>
        </DrawerDescription>
      </DrawerHeader>

      <div className="px-4">
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Add Note</h3>
            <Textarea
              placeholder="Enter your note here..."
              className="min-h-[100px]"
            />
            <Button className="mt-2">Add Note</Button>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Patient Notes</h3>
            <ScrollArea className="h-[400px] rounded-md border p-4">
              <div className="space-y-4">
                {patient.notes.map((note) => (
                  <div
                    key={note.id}
                    className="rounded-lg border p-3 bg-gray-50"
                  >
                    <p className="text-sm text-gray-900">{note.content}</p>
                    <time className="text-xs text-gray-500 mt-2 block">
                      {new Date(note.timestamp).toLocaleString()}
                    </time>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>
    </PatientDrawer>
  );
}
