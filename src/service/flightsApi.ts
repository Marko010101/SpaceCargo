import Cookies from "js-cookie";
import { BASE_URL } from "../constants/BASE_URL";
import type { ApiResponse, FlightRequest, FlightsResponse, FlightUpdateRequest } from "../types/flight";

export const getFlights = async (currentPage: number, perPage: number): Promise<FlightsResponse> => {
  const token = Cookies.get("authToken");

  const res = await fetch(`${BASE_URL}/admin/flight/get_flights?page=${currentPage}&perPage=${perPage}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Unauthorized");
  }

  return res.json();
};

export const createFlight = async (flight: FlightRequest): Promise<ApiResponse> => {
  const token = Cookies.get("authToken");

  const response = await fetch(`${BASE_URL}/admin/flight/register_flight`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(flight),
  });

  if (!response.ok) {
    throw new Error("Failed to create flight");
  }

  return response.json();
};

export const deleteFlight = async (id: number): Promise<ApiResponse> => {
  const token = Cookies.get("authToken");
  const response = await fetch(`${BASE_URL}/admin/flight/delete_flight`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ id }),
  });

  if (!response.ok) {
    throw new Error("Failed to delete flight");
  }

  return response.json();
};

export const updateFlight = async (flight: FlightUpdateRequest): Promise<ApiResponse> => {
  const token = Cookies.get("authToken");

  const response = await fetch(`${BASE_URL}/admin/flight/change_flight`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(flight),
  });

  if (!response.ok) {
    throw new Error("Failed to update flight");
  }

  return response.json();
};
