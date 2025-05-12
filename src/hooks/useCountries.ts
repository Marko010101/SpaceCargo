import { useQuery } from "@tanstack/react-query";
import { Country } from "../types/country";
import { getCountries } from "../service/location";

export const useCountries = () => {
  return useQuery<Country[]>({
    queryKey: ["countries"],
    queryFn: getCountries,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};
