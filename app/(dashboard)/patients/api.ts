"use server";

import { simulateApi } from "@/lib/simulate-api";
import { Note, Patient, SearchParams } from "./types";
import { mockPatients } from "./mock-data";
import { ApiResponse } from "@/types";

type PatientsResponse = ApiResponse<Patient[]>;

export async function getPatients(
  searchParams: SearchParams
): Promise<PatientsResponse> {
  return simulateApi<PatientsResponse>({
    data: {
      data: mockPatients
        .filter((patient) => {
          const statusMatch = searchParams.status
            ? searchParams.status === patient.status
            : true;
          const minAgeMatch = searchParams.minAge
            ? patient.age >= Number(searchParams.minAge)
            : true;
          const maxAgeMatch = searchParams.maxAge
            ? patient.age <= Number(searchParams.maxAge)
            : true;

          const nameMatch = patient.name
            .toLowerCase()
            .includes(searchParams.query?.toLowerCase() ?? "");

          return nameMatch && statusMatch && minAgeMatch && maxAgeMatch;
        })
        .sort((a, b) => {
          // Apply sorting if sort parameter exists
          if (searchParams.sort) {
            const [field, order] = searchParams.sort.split("_");

            if (field === "name") {
              return order === "asc"
                ? a.name.localeCompare(b.name)
                : b.name.localeCompare(a.name);
            } else if (field === "heartRate") {
              return order === "asc"
                ? a.heartRate - b.heartRate
                : b.heartRate - a.heartRate;
            }
          }

          return 0;
        }),
      status: 200,
      message: "Success",
    },
  });
}

type PatientResponse = ApiResponse<Patient>;

export async function getPatient(id: string): Promise<PatientResponse> {
  return simulateApi<PatientResponse>({
    data: {
      data: mockPatients.find((patient) => patient.id == id)!,
      status: 200,
      message: "Success",
    },
    delay: 500,
  });
}

export async function addPatientNote(
  patientId: string,
  content: string
): Promise<ApiResponse<Note>> {
  const patient = mockPatients.find((p) => p.id === patientId);

  if (!patient) {
    return simulateApi<ApiResponse<Note>>({
      data: {
        status: 404,
        message: "Patient not found",
        data: null as unknown as Note,
      },
    });
  }

  const newNote: Note = {
    id: `note-${Date.now()}`,
    content,
    timestamp: new Date().toISOString(),
  };

  patient.notes.unshift(newNote);

  return simulateApi<ApiResponse<Note>>({
    data: {
      data: newNote,
      status: 200,
      message: "Note added successfully",
    },
  });
}
