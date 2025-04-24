import { Button } from "@/components/ui/button";
import {
  DrawerClose,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Badge } from "@/components/ui/badge";
import { X, AlertCircle } from "lucide-react";
import { getPatient } from "../api";
import { cn } from "@/lib/utils";
import { PatientStatus } from "../types";
import { PatientNotes } from "./patient-notes";
import { Alert, AlertDescription } from "@/components/ui/alert";

export async function PatientDetails({ patientId }: { patientId: string }) {
  try {
    const { data: patient } = await getPatient(patientId);

    return (
      <>
        <DrawerHeader>
          <DrawerTitle className="text-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              {patient.name}
              <Badge
                variant="outline"
                className={cn({
                  "bg-green-50 text-green-700 border-green-200":
                    patient.status === PatientStatus.Stable,
                  "bg-red-50 text-red-700 border-red-200":
                    patient.status === PatientStatus.Critical,
                  "bg-yellow-50 text-yellow-700 border-yellow-200":
                    patient.status === PatientStatus.NeedsAttention,
                })}
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

        <PatientNotes patientId={patientId} existingNotes={patient.notes} />
      </>
    );
  } catch (error) {
    return (
      <div className="p-4">
        <div className="flex items-center justify-end mb-12">
          <DrawerClose asChild>
            <Button variant="outline" className="rounded-full p-0 size-8">
              <X />
            </Button>
          </DrawerClose>
        </div>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {(error as Error)?.message || "Patient not found."}
          </AlertDescription>
        </Alert>
      </div>
    );
  }
}
