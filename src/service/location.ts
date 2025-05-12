import Cookies from "js-cookie";
import { BASE_URL } from "../constants/BASE_URL";
import { Country } from "../types/country";
import { City } from "../types/citiy";

export const getCountries = async (): Promise<Country[]> => {
  const token = Cookies.get("authToken");

  const res = await fetch(`${BASE_URL}/admin/flight/get_countries`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Error fetching countries");
  }

  return res.json();
};

export const getCities = async (): Promise<City[]> => {
  const token = Cookies.get("authToken");

  const res = await fetch(`${BASE_URL}/admin/flight/get_cities`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Error fetching cities");
  }

  return res.json();
};
