import axiosInstance from "./axiosInstance";
import { TaskListResponse, TaskResponse } from "@/types/task";
import { ApiResponse } from "@/types/general";

export const taskService = {
  GET_TASKS: async (params?: {
    project_id?: string;
    title?: string;
    status?: "pending" | "in_progress" | "completed";
    is_trashed?: boolean;
    page?: number;
    limit?: number;
    sortBy?: string;
  }): Promise<TaskListResponse> => {
    const response = await axiosInstance.get<TaskListResponse>("/tasks", {
      params,
    });
    return response.data;
  },

  GET_TASK: async (taskId: string): Promise<TaskResponse> => {
    const response = await axiosInstance.get<TaskResponse>(`/tasks/${taskId}`);
    return response.data;
  },

  CREATE_TASK: async (payload: {
    project_id: string;
    title: string;
    description?: string;
    status?: "pending" | "in_progress" | "completed";
  }): Promise<TaskResponse> => {
    const response = await axiosInstance.post<TaskResponse>("/tasks", payload);
    return response.data;
  },

  UPDATE_TASK: async (
    taskId: string,
    payload: {
      title?: string;
      description?: string;
      status?: "pending" | "in_progress" | "completed";
    }
  ): Promise<TaskResponse> => {
    const response = await axiosInstance.patch<TaskResponse>(
      `/tasks/${taskId}`,
      payload
    );
    return response.data;
  },

  DELETE_TASK: async (taskId: string): Promise<ApiResponse> => {
    const response = await axiosInstance.delete<ApiResponse>(
      `/tasks/${taskId}`
    );
    return response.data;
  },

  RESTORE_TASK: async (taskId: string): Promise<TaskResponse> => {
    const response = await axiosInstance.patch<TaskResponse>(
      `/tasks/${taskId}/restore`
    );
    return response.data;
  },
};
