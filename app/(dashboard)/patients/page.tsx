import { Separator } from "@/components/ui/separator";
import { PatientsTable } from "./components/patients-table";
import { Suspense } from "react";
import { SearchParams } from "./types";
import { PatientsFilter } from "./components/patients-filters";
import Search from "@/components/search";
import { PatientsSort } from "./components/patients-sort";
import { Spinner } from "@/components/spinner";
import { PatientDetails } from "./components/patient-details";
import { PatientDrawer } from "./components/patient-drawer";
import { PatientDetailsSkeleton } from "./components/patient-details-skeleton";

export default async function PatientsList({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  return (
    <div className="py-6">
      <div className="mb-6 px-6 flex flex-col gap-1">
        <h1 className="text-2xl font-bold ">Patients List</h1>
        <p>Here You can find list of all patients</p>
      </div>
      <Separator />

      <div className="px-6 pt-4">
        <div className="mb-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
            <div className="w-full sm:w-1/2 lg:w-1/3">
              <Search placeholder="Search Patients" />
            </div>

            <PatientsFilter />
            <PatientsSort />
          </div>
        </div>

        <Suspense
          fallback={
            <div className="w-full h-32 flex items-center justify-center">
              <Spinner />
            </div>
          }
          key={JSON.stringify({ ...searchParams, patientId: undefined })}
        >
          <PatientsTable searchParams={searchParams} />
        </Suspense>

        {searchParams.patientId ? (
          <PatientDrawer>
            <Suspense fallback={<PatientDetailsSkeleton />}>
              <PatientDetails patientId={searchParams.patientId} />
            </Suspense>
          </PatientDrawer>
        ) : null}
      </div>
    </div>
  );
}
