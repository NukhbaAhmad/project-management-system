import axiosInstance from "./axiosInstance";
import { AuthResponse } from "../types/auth";

export const authService = {
  REGISTER: async (
    name: string,
    email: string,
    username: string,
    password: string
  ): Promise<AuthResponse> => {
    const { data } = await axiosInstance.post<AuthResponse>("/auth/register", {
      name,
      email,
      username,
      password,
    });
    return data;
  },

  LOGIN: async (email: string, password: string): Promise<AuthResponse> => {
    const { data } = await axiosInstance.post<AuthResponse>("/auth/login", {
      identifier: email,
      password,
    });
    return data;
  },
};
