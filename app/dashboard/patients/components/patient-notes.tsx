"use client";
import { useState, useOptimistic, useRef, useTransition, useMemo } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, Info } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";

import { Note } from "../types";
import { addPatientNote } from "../api";

interface PatientNotesProps {
  patientId: string;
  existingNotes: Note[];
}

const MIN_NOTE_LENGTH = 5;
const MAX_NOTE_LENGTH = 500;

const validateNote = (
  content: string
): { valid: boolean; message?: string } => {
  if (content.length < MIN_NOTE_LENGTH) {
    return {
      valid: false,
      message: `Note is too short. Minimum length is ${MIN_NOTE_LENGTH} characters.`,
    };
  }

  if (content.length > MAX_NOTE_LENGTH) {
    return {
      valid: false,
      message: `Note is too long. Maximum length is ${MAX_NOTE_LENGTH} characters.`,
    };
  }

  return { valid: true };
};

export function PatientNotes({ patientId, existingNotes }: PatientNotesProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [note, setNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const [optimisticNotes, addOptimisticNote] = useOptimistic(
    existingNotes,
    (state: Note[], newNote: Note) => {
      return [newNote, ...state];
    }
  );

  const { isNearLimit, isOverLimit } = useMemo(() => {
    const remainingChars = MAX_NOTE_LENGTH - note.length;
    return {
      isNearLimit: remainingChars < 50,
      isOverLimit: remainingChars < 0,
    };
  }, [note.length]);

  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setNote(newValue);

    if (error) {
      setError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedNote = note.trim();

    const validation = validateNote(trimmedNote);
    if (!validation.valid) {
      setError(validation.message || "Invalid note content");
      textareaRef.current?.focus();
      return;
    }

    setIsSubmitting(true);
    setError(null);

    const optimisticNote: Note = {
      id: `optimistic-${Date.now()}`,
      content: trimmedNote,
      timestamp: new Date().toISOString(),
    };

    addOptimisticNote(optimisticNote);

    try {
      const response = await addPatientNote(patientId, trimmedNote);

      if (response.status !== 200) {
        throw new Error(response.message || "Failed to add note");
      }

      setNote("");

      startTransition(() => {
        router.refresh();
      });
    } catch (error) {
      console.error("Error adding note:", error);
      setError(
        error instanceof Error
          ? error.message
          : "Failed to add note. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="px-4">
      <div className="space-y-4">
        <div>
          <form ref={formRef} onSubmit={handleSubmit} className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Add Note</h3>

            {error && (
              <Alert variant="destructive" className="mb-3">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="relative">
              <Textarea
                ref={textareaRef}
                placeholder="Enter your note here..."
                className={cn("min-h-[100px]", {
                  "border-red-500 focus:ring-red-500": isOverLimit,
                })}
                value={note}
                onChange={handleNoteChange}
                disabled={isSubmitting || isPending}
              />

              <div
                className={`text-xs mt-1 flex justify-between ${cn({
                  "text-red-500 font-medium": isOverLimit,
                  "text-amber-500": !isOverLimit && isNearLimit,
                  "text-gray-500": !isOverLimit && !isNearLimit,
                })}`}
              >
                <span>{`Min ${MIN_NOTE_LENGTH} characters`}</span>
                <span>{`${note.length}/${MAX_NOTE_LENGTH} characters ${
                  isOverLimit ? "(exceeded maximum)" : ""
                }`}</span>
              </div>
            </div>

            <div className="mt-3 flex justify-between items-center">
              <Button
                type="submit"
                disabled={
                  isSubmitting ||
                  isPending ||
                  note.length < MIN_NOTE_LENGTH ||
                  note.length > MAX_NOTE_LENGTH
                }
              >
                {isSubmitting
                  ? "Adding..."
                  : isPending
                  ? "Updating..."
                  : "Add Note"}
              </Button>

              {!error && note.length > 0 && (
                <div className="text-xs text-gray-500 flex items-center">
                  <Info className="h-3 w-3 mr-1" />
                  Press Enter to submit
                </div>
              )}
            </div>
          </form>

          <div>
            <h3 className="text-lg font-semibold mb-2">Patient Notes</h3>
            <div className="h-[400px] overflow-y-auto rounded-md border p-4">
              <div className="space-y-4">
                {optimisticNotes.length > 0 ? (
                  optimisticNotes.map((note) => (
                    <div
                      key={note.id}
                      className={`rounded-lg border p-3 transition-colors duration-300 ${
                        note.id.startsWith("optimistic")
                          ? "bg-blue-50 border-blue-100"
                          : "bg-gray-50"
                      }`}
                    >
                      <p className="text-sm text-gray-900">{note.content}</p>
                      <div className="flex justify-between items-center mt-2">
                        <time className="text-xs text-gray-500">
                          {new Date(note.timestamp).toLocaleString()}
                        </time>
                        {note.id.startsWith("optimistic") && (
                          <span className="text-xs text-blue-500 animate-pulse">
                            Saving...
                          </span>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-gray-500 py-4">
                    No notes yet. Add the first note above.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
