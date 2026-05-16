import axiosInstance from "./axiosInstance";
import {
  UserResponse,
  UpdateUserPayload,
  DeleteUserResponse,
} from "@/types/user";

export const userService = {
  GET_USER: async (userId: string): Promise<UserResponse> => {
    const response = await axiosInstance.get<UserResponse>(`/user/${userId}`);
    return response.data;
  },

  UPDATE_USER: async (
    userId: string,
    payload: UpdateUserPayload
  ): Promise<UserResponse> => {
    const response = await axiosInstance.patch<UserResponse>(
      `/user/${userId}`,
      payload
    );
    return response.data;
  },

  DELETE_USER: async (userId: string): Promise<DeleteUserResponse> => {
    const response = await axiosInstance.delete<DeleteUserResponse>(
      `/user/${userId}`
    );
    return response.data;
  },
};
