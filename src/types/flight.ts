export type Flight = {
  id: number;
  flightNumber: string;
  flightDate: string;
  fromCountryId: number;
  fromCountryDictionaryKey: string;
  fromCityId: number;
  fromCityDictionaryKey: string;
  toCountryId: number;
  toCountryDictionaryKey: string;
  toCityId: number;
  toCityDictionaryKey: string;
  inpDate: string;
  actions: ("edit" | "delete")[];
};

export type FlightsResponse = {
  recordsNumber: number;
  currentPage: number;
  perPage: number;
  flights: Flight[];
};

export interface FlightRequest {
  flightNumber: string;
  flightDate: string;
  fromCountryId?: number;
  fromCityId?: number;
  toCountryId?: number;
  toCityId?: number;
}

export interface FlightUpdateRequest extends FlightRequest {
  id: number;
}

export interface ApiResponse {
  type: "success" | "error";
  message: string;
}
