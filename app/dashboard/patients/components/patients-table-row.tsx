"use client";

import { TableCell, TableRow } from "@/components/ui/table";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Patient } from "../types";
import { StatusBadge } from "./status-badge";

export function PatientsTableRow({
  id,
  name,
  age,
  status,
  heartRate,
  notes,
}: Patient) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { push } = useRouter();

  const onClick = () => {
    const params = new URLSearchParams(searchParams);
    params.set("patientId", id);

    push(`${pathname}?${params.toString()}`);
  };

  return (
    <TableRow
      className="border-b last:border-0 hover:bg-gray-50"
      onClick={onClick}
    >
      <TableCell className="font-medium">{name}</TableCell>
      <TableCell>{age}</TableCell>
      <TableCell className={`font-medium`}>
        <StatusBadge status={status} />
      </TableCell>
      <TableCell>{heartRate} bpm</TableCell>
      <TableCell className="text-gray-600">
        {notes.length > 0
          ? `${notes[0].content} (${new Date(
              notes[0].timestamp
            ).toLocaleDateString()})`
          : "No notes"}
      </TableCell>
    </TableRow>
  );
}
