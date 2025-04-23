import { Separator } from "@/components/ui/separator";
import { PatientsTable } from "./components/patients-table";
import { Suspense } from "react";
import { SearchParams } from "./types";
import { PatientsFilter } from "./components/patients-filters";

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
        <PatientsFilter />

        <Suspense fallback={"loading"} key={JSON.stringify(searchParams)}>
          <PatientsTable searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  );
}
