import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FlightRequest } from "../types/flight";
import { createFlight } from "../service/flightsApi";

export const useCreateFlight = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (flight: FlightRequest) => createFlight(flight),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["flights"] });
    },
    onError: (error) => {
      console.error("Create flight error:", error);
    },
  });
};
