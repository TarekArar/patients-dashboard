import { Patient, PatientStatus } from "./types";

export const mockPatients: Patient[] = [
  {
    id: "p1",
    name: "John Doe",
    age: 45,
    status: PatientStatus.Stable,
    heartRate: 72,
    notes: [
      {
        id: "n1",
        content: "Regular checkup - all normal",
        timestamp: "2024-01-20T10:00:00Z",
      },
    ],
  },
  {
    id: "p2",
    name: "Jane Smith",
    age: 62,
    status: PatientStatus.NeedsAttention,
    heartRate: 85,
    notes: [
      {
        id: "n2",
        content: "Blood pressure slightly elevated",
        timestamp: "2024-01-19T15:30:00Z",
      },
    ],
  },
  {
    id: "p3",
    name: "Robert Johnson",
    age: 78,
    status: PatientStatus.Critical,
    heartRate: 95,
    notes: [
      {
        id: "n3",
        content: "Admitted for chest pain, requires immediate attention",
        timestamp: "2024-01-20T08:15:00Z",
      },
    ],
  },
  {
    id: "p4",
    name: "Sarah Williams",
    age: 35,
    status: PatientStatus.Stable,
    heartRate: 68,
    notes: [
      {
        id: "n4",
        content: "Post-surgery recovery progressing well",
        timestamp: "2024-01-18T14:20:00Z",
      },
    ],
  },
  {
    id: "p5",
    name: "Michael Brown",
    age: 52,
    status: PatientStatus.NeedsAttention,
    heartRate: 88,
    notes: [
      {
        id: "n5",
        content: "Showing signs of infection at incision site",
        timestamp: "2024-01-20T09:45:00Z",
      },
    ],
  },
  {
    id: "p6",
    name: "Emily Davis",
    age: 29,
    status: PatientStatus.Stable,
    heartRate: 70,
    notes: [
      {
        id: "n6",
        content: "Routine pregnancy checkup - normal",
        timestamp: "2024-01-19T11:30:00Z",
      },
    ],
  },
  {
    id: "p7",
    name: "David Wilson",
    age: 68,
    status: PatientStatus.Critical,
    heartRate: 92,
    notes: [
      {
        id: "n7",
        content: "Severe respiratory distress",
        timestamp: "2024-01-20T07:00:00Z",
      },
    ],
  },
];
