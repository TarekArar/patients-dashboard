import { PatientStatus } from "./types";

export const getStatusColor = (status: PatientStatus) => {
  switch (status) {
    case PatientStatus.Stable:
      return "text-green-600";
    case PatientStatus.NeedsAttention:
      return "text-yellow-600";
    case PatientStatus.Critical:
      return "text-red-600";
    default:
      return "";
  }
};
