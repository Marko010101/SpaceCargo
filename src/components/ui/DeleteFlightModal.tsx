import React from "react";
import { Flight } from "../../types/flight";
import { useDeleteFlight } from "../../hooks/useDeleteFlight";
import toast from "react-hot-toast";
import { useOutsideClick } from "../../hooks/useOutsideClick";

type Props = {
  flight: Flight;
  onClose: () => void;
};

const DeleteFlightModal = ({ flight, onClose }: Props) => {
  const { mutate, isPending } = useDeleteFlight();
  const modalRef = useOutsideClick(onClose);

  const handleDelete = () => {
    mutate(flight.id, {
      onSuccess: () => {
        toast.success(`Flight ${flight.flightNumber} deleted successfully`);
        onClose();
      },
    });
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div ref={modalRef} className="bg-white dark:bg-slate-800 p-6 rounded-md w-full max-w-md shadow-md">
        <p className="mb-4 text-sm">
          Are you sure you want to delete flight <strong>{flight.flightNumber}</strong>?
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onClose}
            className="text-sm text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-400"
            disabled={isPending}
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="text-sm text-red-600 dark:text-red-400  hover:text-red-900 dark:hover:text-red-500"
            disabled={isPending}
          >
            {isPending ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteFlightModal;
