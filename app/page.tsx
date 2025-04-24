import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="h-screen flex flex-col gap-4 items-center justify-center">
      <p>
        Navigate to /dashboard/patients to see the patients dashboard or click
        the above button
      </p>
      <Button>
        <Link href="/dashboard/patients">Go To Patients</Link>
      </Button>
    </main>
  );
}
