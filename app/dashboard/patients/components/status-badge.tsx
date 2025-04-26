import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { PatientStatus } from "../types";

export function StatusBadge({ status }: { status: PatientStatus }) {
  return (
    <Badge
      variant="outline"
      className={cn({
        "bg-green-50 text-green-700 border-green-200":
          status === PatientStatus.Stable,
        "bg-red-50 text-red-700 border-red-200":
          status === PatientStatus.Critical,
        "bg-yellow-50 text-yellow-700 border-yellow-200":
          status === PatientStatus.NeedsAttention,
      })}
    >
      {status.replace("_", " ")}
    </Badge>
  );
}
