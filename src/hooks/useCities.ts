import { useQuery } from "@tanstack/react-query";
import { City } from "../types/citiy";
import { getCities } from "../service/location";

export const useCities = () => {
  return useQuery<City[]>({
    queryKey: ["cities"],
    queryFn: getCities,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};
