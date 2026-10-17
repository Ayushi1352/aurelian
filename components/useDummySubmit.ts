"use client";

import { useEffect, useState, type FormEvent } from "react";

type Status = "idle" | "sending" | "sent" | "hiding";

const FADE_MS = 400;

/**
 * Simulates sending a form (no backend yet): "sending" → "sent" (thank-you message)
 * → message fades out after `showFor` ms and an empty form is shown again.
 */
export default function useDummySubmit({ delay = 1200, showFor = 5000 } = {}) {
  const [status, setStatus] = useState<Status>("idle");
  const [name, setName] = useState("");

  useEffect(() => {
    if (status === "sending") {
      const t = window.setTimeout(() => setStatus("sent"), delay);
      return () => window.clearTimeout(t);
    }
    if (status === "sent") {
      const t = window.setTimeout(() => setStatus("hiding"), showFor);
      return () => window.clearTimeout(t);
    }
    if (status === "hiding") {
      const t = window.setTimeout(() => setStatus("idle"), FADE_MS);
      return () => window.clearTimeout(t);
    }
  }, [status, delay, showFor]);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status !== "idle") return;
    setName(String(new FormData(e.currentTarget).get("name") ?? ""));
    setStatus("sending");
  }

  /** Hide the thank-you message straight away (close button). */
  function dismiss() {
    setStatus("hiding");
  }

  const showThanks = status === "sent" || status === "hiding";

  return { status, name, onSubmit, dismiss, showThanks, hiding: status === "hiding" };
}
