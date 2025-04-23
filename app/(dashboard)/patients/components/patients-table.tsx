import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Patient, SearchParams } from "../types";
import { getStatusColor } from "../utils";
import { getPatients } from "../api";

interface PatientsTableProps {
  searchParams: SearchParams;
}

export async function PatientsTable({ searchParams }: PatientsTableProps) {
  const { data } = await getPatients(searchParams);

  return (
    <div className="rounded-lg border bg-white">
      <Table>
        <TableHeader>
          <TableRow className="border-b hover:bg-transparent">
            <TableHead className="font-semibold text-gray-900">Name</TableHead>
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
              <TableCell colSpan={5} className="h-24 text-center text-gray-500">
                No patients found
              </TableCell>
            </TableRow>
          ) : (
            data.map((patient: Patient) => (
              <TableRow
                key={patient.id}
                className="border-b last:border-0 hover:bg-gray-50"
              >
                <TableCell className="font-medium">{patient.name}</TableCell>
                <TableCell>{patient.age}</TableCell>
                <TableCell
                  className={`${getStatusColor(patient.status)} font-medium`}
                >
                  {patient.status.replace("_", " ")}
                </TableCell>
                <TableCell>{patient.heartRate} bpm</TableCell>
                <TableCell className="text-gray-600">
                  {patient.notes.length > 0
                    ? `${patient.notes[0].content} (${new Date(
                        patient.notes[0].timestamp
                      ).toLocaleDateString()})`
                    : "No notes"}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
