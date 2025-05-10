import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { translateErrorMessage } from "../constants/translateErrorMessage";
import { getFlights } from "../service/flightsApi";

export const useFlights = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["flights"],
    queryFn: getFlights,
  });

  if (error) {
    const errorMessage = translateErrorMessage(error.message);
    toast.error(errorMessage);
  }

  return { data, isLoading, error };
};
