import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteFlight } from "../service/flightsApi";
import { ApiResponse } from "../types/flight";

export const useDeleteFlight = () => {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse, Error, number>({
    mutationFn: deleteFlight,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["flights"] });
    },
    onError: (error) => {
      console.error("Delete failed", error);
    },
  });
};
