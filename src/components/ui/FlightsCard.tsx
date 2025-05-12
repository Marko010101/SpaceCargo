import { Plane } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Flight } from "../../types/flight";
import { extractDictionaryValue, formatDateTime } from "../../utils/helper";
import DeleteFlightModal from "./DeleteFlightModal";

type FlightsCardProps = {
  flight: Flight;
  isPlaceholderData?: boolean;
};

const FlightsCard = ({ flight, isPlaceholderData }: FlightsCardProps) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const navigate = useNavigate();
  const {
    flightNumber,
    flightDate,
    fromCountryDictionaryKey,
    fromCityDictionaryKey,
    toCountryDictionaryKey,
    toCityDictionaryKey,
    inpDate,
    actions,
  } = flight;

  const { formattedDate, formattedTime } = formatDateTime(flightDate);

  return (
    <>
      <div className="p-3 border border-slate-400 dark:border-slate-600 rounded-md shadow-sm flex flex-col justify-between">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 justify-between">
            <h2 className="text-lg font-medium bg-slate-300 dark:bg-slate-700 py-1 px-2 rounded-md w-max">
              Flight number: <span className="font-light">{flightNumber}</span>
            </h2>
            <Plane size={28} className="stroke-none fill-amber-600" />
          </div>
          <p className="font-light">
            <strong className="font-normal">Route:</strong> {extractDictionaryValue(fromCityDictionaryKey)} (
            {extractDictionaryValue(fromCountryDictionaryKey)}) ➝ {extractDictionaryValue(toCityDictionaryKey)} (
            {extractDictionaryValue(toCountryDictionaryKey)})
          </p>
          <p className="font-light">
            <strong className="font-normal">Flight Date:</strong> {formattedDate}{" "}
            <span className="text-slate-700 dark:text-slate-400">{formattedTime}</span>
          </p>
        </div>
        <div className="flex justify-between items-center mt-2">
          <p className="text-sm text-gray-500 mt-2">Added: {inpDate}</p>
          <div className="flex gap-2">
            {actions.includes("edit") && (
              <button
                onClick={() => navigate(`/flights/edit/${flight.id}${location.search}`)}
                disabled={isPlaceholderData}
                className="p-1 text-sm underline font-normal hover:text-slate-500 dark:hover:text-slate-300 disabled:cursor-progress"
                aria-label="Edit flight"
              >
                Edit
              </button>
            )}
            {actions.includes("delete") && (
              <button
                onClick={() => setIsDeleteModalOpen(true)}
                disabled={isPlaceholderData}
                className="p-1 text-sm underline font-normal text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-600 disabled:cursor-progress"
                aria-label="Delete flight"
              >
                Delete
              </button>
            )}
          </div>
        </div>
      </div>

      {isDeleteModalOpen && <DeleteFlightModal flight={flight} onClose={() => setIsDeleteModalOpen(false)} />}
      {/* {isEditModalOpen && <EditFlightModal flight={flight} onClose={() => setIsEditModalOpen(false)} />} */}
    </>
  );
};

export default FlightsCard;
