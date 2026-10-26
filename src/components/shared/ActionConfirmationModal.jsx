import Modal from "./Modal";

export default function ActionConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = "Delete",
  cancelText = "Cancel",
  variant = "danger",
}) {
  if (!isOpen) {
    return null;
  }

  const isDanger = variant === "danger";

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      labelledBy="action-confirmation-title"
      compact
      className="!max-w-[40rem] !rounded-[1rem] !border !border-[#dfe5dc] !bg-[#f8faf8] !px-8 !py-8 shadow-[0_12px_12px_rgba(16,49,40,0.058)] sm:!px-10 sm:!py-10"
    >
      <div className="w-full max-w-[29rem]">
        <h2
          id="action-confirmation-title"
          className="text-2xl font-semibold tracking-[-0.04em] text-[#0a422a] sm:text-[2.4rem]"
        >
          {title}
        </h2>

        <p className="mt-5 text-base leading-[1.55] text-[#203c31] sm:text-lg">
          {description}
        </p>

        <div className="mt-8 space-y-4">
          <button
            type="button"
            onClick={onConfirm}
            className={`flex min-h-[4.1rem] w-full items-center justify-center rounded-[0.75rem] px-6 text-base font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#07512f] ${
              isDanger
                ? "bg-[#b02222] text-white shadow-[0_6px_12px_rgba(176,34,34,0.117)] hover:bg-[#9d1d1d]"
                : "bg-[#0b5b43] text-white shadow-[0_6px_12px_rgba(11,91,67,0.104)] hover:bg-[#0a4e3a]"
            }`}
          >
            {confirmText}
          </button>

          <button
            type="button"
            onClick={onClose}
            className="flex min-h-[4.1rem] w-full items-center justify-center rounded-[0.75rem] border border-[#1a372d] bg-white px-6 text-base font-semibold text-[#0a422a] transition hover:bg-[#f4f8f3] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#07512f]"
          >
            {cancelText}
          </button>
        </div>
      </div>
    </Modal>
  );
}
