import { Modal } from "./Modal";
import { Button } from "./Button";
import { AlertCircleIcon } from "lucide-react";

export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title = "Are you sure?",
  message = "This action cannot be undone.",
  confirmText = "Delete",
  confirmVariant = "danger",
  isLoading = false,
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="flex items-center gap-4 mb-6">
        <div className="p-2 rounded-full bg-rose-50 shrink-0">
          <AlertCircleIcon className="size-6 text-rose-600" />
        </div>
        <div>
          <p className="text-sm text-[#8C7A6B] leading-relaxed">{message}</p>
        </div>
      </div>
      <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E5DEC9]">
        <Button variant="ghost" onClick={onClose} disabled={isLoading}>
          Cancel
        </Button>
        <Button
          variant={confirmVariant}
          onClick={onConfirm}
          isLoading={isLoading}
        >
          {confirmText}
        </Button>
      </div>
    </Modal>
  );
}
