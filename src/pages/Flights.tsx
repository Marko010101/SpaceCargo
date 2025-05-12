import { CirclePlus } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import FlightFormModal from "../components/FlightFormModal";
import FlightsCard from "../components/ui/FlightsCard";
import Loader from "../components/ui/Loader";
import Pagination from "../components/ui/Pagination";
import { PER_PAGE } from "../constants/PER_PAGE_FLIGHT";
import useBreakpoint from "../hooks/useBreakpoint";
import { useFlights } from "../hooks/useFlights";

const Flights = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageFromUrl = parseInt(searchParams.get("page") || "1", 10);
  const [currentPage, setCurrentPage] = useState(pageFromUrl);
  const { isSmOrLarger } = useBreakpoint();
  const { flightId } = useParams();
  const navigate = useNavigate();
  const [isCreateFlightModalOpen, setIsCreateFlightModalOpen] = useState(false);

  const { data, isLoading, isPlaceholderData } = useFlights(currentPage, PER_PAGE);
  const { flights = [], recordsNumber = 0 } = data || {};
  const totalPages = Math.ceil(recordsNumber / PER_PAGE);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      setSearchParams({ page: newPage.toString() });
    }
  };

  useEffect(() => {
    setCurrentPage(pageFromUrl);
  }, [pageFromUrl]);

  if (isLoading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  const flightToEdit = flightId ? flights.find((f) => f.id === Number(flightId)) : null;

  return (
    <section className="flex flex-col mt-3 mb-10">
      <button
        onClick={() => setIsCreateFlightModalOpen(true)}
        className="self-end justify-self-center p-2 flex items-center justify-center gap-1.5 bg-slate-300 dark:bg-slate-500 rounded-3xl"
      >
        <span>Create Flight</span>
        <span>
          <CirclePlus size={20} />
        </span>
      </button>
      <div className={`${isPlaceholderData ? "opacity-75" : ""} grid grid-cols-1 gap-4 sm:grid-cols-2 mt-3`}>
        {flights.map((flight) => (
          <FlightsCard key={flight.id} flight={flight} isPlaceholderData={isPlaceholderData} />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        range={isSmOrLarger ? 3 : 1}
      />

      {flightToEdit && (
        <FlightFormModal initialData={flightToEdit} onClose={() => navigate(`/flights${window.location.search}`)} />
      )}
      {isCreateFlightModalOpen && <FlightFormModal onClose={() => setIsCreateFlightModalOpen(false)} />}
    </section>
  );
};

export default Flights;
