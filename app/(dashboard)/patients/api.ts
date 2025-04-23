import { simulateApi } from "@/lib/simulate-api";
import { Patient, SearchParams } from "./types";
import { mockPatients } from "./mock-data";
import { ApiResponse } from "@/types";

type PatientsResponse = ApiResponse<Patient[]>;

export function getPatients(
  searchParams: SearchParams
): Promise<PatientsResponse> {
  return simulateApi<PatientsResponse>({
    data: {
      data: mockPatients.filter((el) => {
        const statusMatch = searchParams.status
          ? searchParams.status === el.status
          : true;
        const minAgeMatch = searchParams.minAge
          ? el.age >= Number(searchParams.minAge)
          : true;
        const maxAgeMatch = searchParams.maxAge
          ? el.age <= Number(searchParams.maxAge)
          : true;

        return statusMatch && minAgeMatch && maxAgeMatch;
      }),
      status: 200,
      message: "Success",
    },
  });
}
