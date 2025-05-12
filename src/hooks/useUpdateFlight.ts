import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateFlight } from "../service/flightsApi";
import { ApiResponse, FlightUpdateRequest } from "../types/flight";
import toast from "react-hot-toast";

const useUpdateFlight = () => {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse, Error, FlightUpdateRequest>({
    mutationFn: updateFlight,
    onSuccess: () => {
      toast.success("Flight updated successfully");
      queryClient.invalidateQueries({ queryKey: ["flights"] });
    },
    onError: (error: Error) => {
      console.error("Error updating flight:", error.message);
      toast.error("Failed to update flight");
    },
  });
};

export default useUpdateFlight;
