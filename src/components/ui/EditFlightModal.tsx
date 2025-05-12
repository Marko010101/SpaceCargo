import { useOutsideClick } from "../../hooks/useOutsideClick";
import { Flight } from "../../types/flight";

type Props = {
  flight: Flight;
  onClose: () => void;
};

const EditFlightModal = ({ flight, onClose }: Props) => {
  const modalRef = useOutsideClick(onClose);
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div ref={modalRef} className="bg-white dark:bg-slate-800 p-6 rounded-md w-full max-w-md shadow-md">
        <h2 className="text-xl font-semibold mb-4">Edit Flight</h2>
        <p className="mb-2 text-sm">Flight Number: {flight.flightNumber}</p>
        <div className="flex justify-end mt-4">
          <button onClick={onClose} className="text-sm underline text-slate-600 hover:text-slate-900">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditFlightModal;
