import Cookies from "js-cookie";
import { BASE_URL } from "../constants/BASE_URL";
import type { FlightsResponse } from "../types/flight";

export const getFlights = async (): Promise<FlightsResponse> => {
  const token = Cookies.get("authToken");

  const res = await fetch(`${BASE_URL}/admin/flight/get_flights`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Unauthorized");
  }

  return res.json();
};
