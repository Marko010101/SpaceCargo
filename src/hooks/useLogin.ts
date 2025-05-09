import { useMutation } from "@tanstack/react-query";
import { login } from "../service/auth";
import toast from "react-hot-toast";
import { translateErrorMessage } from "../constants/translateErrorMessage";
import { useAuth } from "../context/AuthContext";
import Cookies from "js-cookie";

export const useLogin = () => {
  const { setUser } = useAuth();

  const { mutate, isPending, error, data } = useMutation({
    mutationFn: login,
    onError: (error) => {
      const errorMessage = translateErrorMessage(error.message);
      toast.error(errorMessage);
    },
    onSuccess: (data) => {
      const { user, token } = data.message;
      toast.success("Login successful");
      Cookies.set("authToken", token);
      Cookies.set("authUser", JSON.stringify(user));
      setUser(user);
    },
  });

  return { mutate, isPending, error, data };
};
