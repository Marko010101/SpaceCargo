export interface Country {
  countryId: number;
  countryName: string;
  countryDictionaryKey: string;
  sendAllowed: "Y" | "N";
  receivedAllowed: "Y" | "N";
}
