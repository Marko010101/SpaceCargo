import { keepPreviousData, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { translateErrorMessage } from "../constants/translateErrorMessage";
import { getFlights } from "../service/flightsApi";

export const useFlights = (currentPage: number, perPage: number) => {
  const { data, isLoading, error, isFetching, isPlaceholderData } = useQuery({
    queryKey: ["flights", currentPage, perPage],
    queryFn: () => getFlights(currentPage, perPage),
    placeholderData: keepPreviousData,
  });

  if (error) {
    const errorMessage = translateErrorMessage(error.message);
    toast.error(errorMessage);
  }

  return { data, isLoading, error, isFetching, isPlaceholderData };
};
