import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Metadata } from "next";

export default function Home() {
  return (
    <main
      className="h-screen flex flex-col gap-4 items-center justify-center"
      role="main"
      aria-label="Welcome Page"
    >
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
