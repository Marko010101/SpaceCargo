export type User = {
  id: number;
  userName: string;
  firstNameGe: string;
  lastNameGe: string;
  firstNameEn: string;
  lastNameEn: string;
  companyNameGe: string | null;
  companyNameEn: string | null;
  gender: "M" | "F";
  roomNumber: string;
  userTypeId: number;
  phone: string;
};
