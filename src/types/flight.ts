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
