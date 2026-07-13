import { useEffect } from "react";

export default function useEscapeKey(handler, enabled = true) {
  useEffect(() => {
    if (!enabled) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") handler();
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [handler, enabled]);
}
