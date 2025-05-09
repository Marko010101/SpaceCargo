export const translateErrorMessage = (message: string): string => {
  const errorMessages: { [key: string]: string } = {
    "მომხმარებლის სახელი ან პაროლი არასწორია": "Username or password is incorrect", // Corrected message
  };

  return errorMessages[message] || message; // Default to the original message if no translation found
};
