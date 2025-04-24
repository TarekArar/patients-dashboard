export enum PatientStatus {
  Stable = "stable",
  NeedsAttention = "needs_attention",
  Critical = "critical",
}

export interface Note {
  id: string;
  content: string;
  timestamp: string;
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  status: PatientStatus;
  heartRate: number;
  notes: Note[];
}

export interface SearchParams {
  query?: string;
  status?: string;
  minAge?: string;
  maxAge?: string;
  sort?: string;
  patientId?: string;
}
