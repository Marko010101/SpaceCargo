export const extractDictionaryValue = (key: string): string => {
  const value = key.split(".")[1];
  return value;
};

export const formatDateTime = (dateTime: string): { formattedDate: string; formattedTime: string } => {
  const [datePart, timePart] = dateTime.split(" ");
  const [year, month, day] = datePart.split("-");

  const formattedDate = `${day}-${month}-${year}`; // e.g. "10-05-2025"
  const formattedTime = timePart?.slice(0, 5) || ""; // e.g. "08:11"

  return { formattedDate, formattedTime };
};
