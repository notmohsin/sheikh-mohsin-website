"use client";

import { useState } from "react";

import { env } from "@/env";
import { Button } from "@/components/ui/button";

export default function GuestbookForm() {
  const formId = env.NEXT_PUBLIC_FORMSPREE_FORM_ID;
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );

  if (!formId) {
    return (
      <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
        Notes go to my inbox once <code>NEXT_PUBLIC_FORMSPREE_FORM_ID</code> is
        set. Create a form at Formspree and paste its id.
      </p>
    );
  }

  if (status === "sent") {
    return (
      <p className="text-sm leading-relaxed text-foreground">
        Got it. I read these in my inbox.
      </p>
    );
  }

  return (
    <form
      className="flex max-w-xl flex-col gap-4"
      onSubmit={async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        setStatus("sending");

        try {
          const response = await fetch(`https://formspree.io/f/${formId}`, {
            method: "POST",
            headers: { Accept: "application/json" },
            body: new FormData(form),
          });

          if (!response.ok) {
            setStatus("error");
            return;
          }

          form.reset();
          setStatus("sent");
        } catch {
          setStatus("error");
        }
      }}
    >
      <label className="flex flex-col gap-1 text-sm">
        <span className="text-secondary">Name</span>
        <input
          required
          name="name"
          autoComplete="name"
          className="rounded-md border border-input bg-card px-3 py-2 text-foreground"
        />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        <span className="text-secondary">Note</span>
        <textarea
          required
          name="message"
          rows={5}
          className="rounded-md border border-input bg-card px-3 py-2 text-foreground"
        />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        <span className="text-secondary">Link, if you want one</span>
        <input
          name="url"
          type="url"
          placeholder="https://"
          className="rounded-md border border-input bg-card px-3 py-2 text-foreground"
        />
      </label>
      <input
        type="text"
        name="_gotcha"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />
      <div className="flex items-center gap-3">
        <Button
          type="submit"
          disabled={status === "sending"}
        >
          {status === "sending" ? "Sending" : "Leave a note"}
        </Button>
        {status === "error" ?
          <p className="text-xs text-destructive">
            That did not send. Try again in a moment.
          </p>
        : null}
      </div>
    </form>
  );
}
