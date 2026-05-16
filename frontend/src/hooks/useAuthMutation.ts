import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { authService } from "@/api/authService";
import { useAuth } from "@/hooks/useAuth";
import { AuthResponse } from "@/types/auth";
import { showToast } from "@/lib/toast";
import { parsedError } from "@/lib/errorHandler";

type RegisterArgs = {
  name: string;
  email: string;
  username: string;
  password: string;
};

type LoginArgs = {
  identifier: string;
  password: string;
};

export const useRegisterUser = (): UseMutationResult<
  AuthResponse,
  Error,
  RegisterArgs
> => {
  const { loginUser } = useAuth();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: ({ name, email, username, password }: RegisterArgs) =>
      authService.REGISTER(name, email, username, password),
    onSuccess: (res) => {
      loginUser(res.data.user, res.data.access_token);
      showToast.success(res.message || "Registration successful! Welcome 🎉");
      navigate("/");
    },
    onError: (error: any) => {
      const errorMessage = parsedError(
        error,
        "Registration failed. Please try again."
      );
      showToast.error(errorMessage);
    },
  });
};

export const useLoginUser = (): UseMutationResult<
  AuthResponse,
  Error,
  LoginArgs
> => {
  const { loginUser } = useAuth();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: ({ identifier, password }: LoginArgs) =>
      authService.LOGIN(identifier, password),
    onSuccess: (res) => {
      loginUser(res.data.user, res.data.access_token);
      showToast.success(res.message || "Logged in successfully!");
      navigate("/");
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message || "Invalid email or password.";
      showToast.error(message);
    },
  });
};
