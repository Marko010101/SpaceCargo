import { BASE_URL } from "../constants/BASE_URL";

export const login = async (data: { email: string; password: string }) => {
  const formData = new FormData();
  formData.append("userName", data.email);
  formData.append("password", data.password);
  formData.append("channel", "ADMIN");

  const response = await fetch(`${BASE_URL}/admin/login`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Login failed");
  }

  return response.json();
};
