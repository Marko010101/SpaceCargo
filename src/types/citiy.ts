export interface City {
  cityId: number;
  countryId: number;
  cityName: string;
  cityDictionaryKey: string;
  sendAllowed: "Y" | "N";
  receivedAllowed: "Y" | "N";
}
