import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Patient, SearchParams } from "../types";
import { getPatients } from "../api";
import { PatientsTableRow } from "./patients-table-row";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface PatientsTableProps {
  searchParams: SearchParams;
}

export async function PatientsTable({ searchParams }: PatientsTableProps) {
  try {
    const { data } = await getPatients(searchParams);

    return (
      <div className="rounded-lg border bg-white">
        <Table>
          <TableHeader>
            <TableRow className="border-b hover:bg-transparent">
              <TableHead className="font-semibold text-gray-900">
                Name
              </TableHead>
              <TableHead className="font-semibold text-gray-900">Age</TableHead>
              <TableHead className="font-semibold text-gray-900">
                Status
              </TableHead>
              <TableHead className="font-semibold text-gray-900">
                Heart Rate
              </TableHead>
              <TableHead className="font-semibold text-gray-900">
                Latest Note
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="h-24 text-center text-gray-500"
                >
                  No patients found
                </TableCell>
              </TableRow>
            ) : (
              data.map((patient: Patient) => (
                <PatientsTableRow key={patient.id} {...patient} />
              ))
            )}
          </TableBody>
        </Table>
      </div>
    );
  } catch (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          {error instanceof Error
            ? error.message
            : "Failed to load patients data. Please try again later."}
          Failed to load patients data. Please try again later.
        </AlertDescription>
      </Alert>
    );
  }
}
