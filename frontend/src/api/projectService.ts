import axiosInstance from "./axiosInstance";
import { ProjectListResponse, ProjectResponse } from "@/types/project";
import { ApiResponse } from "@/types/general";

export const projectService = {
  GET_PROJECTS: async (params?: {
    title?: string;
    is_trashed?: boolean;
    page?: number;
    limit?: number;
    sortBy?: string;
  }): Promise<ProjectListResponse> => {
    const response = await axiosInstance.get<ProjectListResponse>("/project", {
      params,
    });
    return response.data; // ✅ return only the API response body
  },

  GET_PROJECT: async (projectId: string): Promise<ProjectResponse> => {
    const response = await axiosInstance.get<ProjectResponse>(
      `/project/${projectId}`
    );
    return response.data;
  },

  CREATE_PROJECT: async (payload: {
    title: string;
    description?: string;
  }): Promise<ProjectResponse> => {
    const response = await axiosInstance.post<ProjectResponse>(
      "/project",
      payload
    );
    return response.data;
  },

  UPDATE_PROJECT: async (
    projectId: string,
    payload: { title?: string; description?: string }
  ): Promise<ProjectResponse> => {
    const response = await axiosInstance.patch<ProjectResponse>(
      `/project/${projectId}`,
      payload
    );
    return response.data;
  },

  DELETE_PROJECT: async (projectId: string): Promise<ApiResponse> => {
    const response = await axiosInstance.delete<ApiResponse>(
      `/project/${projectId}`
    );
    return response.data;
  },

  RESTORE_PROJECT: async (projectId: string): Promise<ProjectResponse> => {
    const response = await axiosInstance.patch<ProjectResponse>(
      `/project/${projectId}/restore`
    );
    return response.data;
  },

  RESTORE_PROJECT_TASKS: async (projectId: string): Promise<ApiResponse> => {
    const response = await axiosInstance.patch<ApiResponse>(
      `/project/${projectId}/restore-tasks`
    );
    return response.data;
  },
};
