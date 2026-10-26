import { useEffect } from "react";

export default function Modal({
  isOpen,
  onClose,
  labelledBy,
  children,
  className = "",
  compact = false,
}) {
  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#f4f6f3]/95 p-4 sm:p-6"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        className={`flex w-full flex-col items-center rounded-[18px] bg-white text-center shadow-[0_10px_12px_rgba(16,49,40,0.052)] sm:rounded-[20px] ${
          compact
            ? "min-h-0 max-w-lg px-7 py-10 sm:px-10"
            : "min-h-[min(36rem,90dvh)] max-w-2xl px-6 py-12 sm:px-12 sm:py-16"
        } ${className}`}
      >
        {children}
      </section>
    </div>
  );
}
