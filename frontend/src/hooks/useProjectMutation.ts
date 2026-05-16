import {
  useQuery,
  useMutation,
  UseQueryResult,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { projectService } from "@/api/projectService";
import { Project, ProjectListResponse, ProjectResponse } from "@/types/project";
import { showToast } from "@/lib/toast";
import { parsedError } from "@/lib/errorHandler";
import { ApiResponse } from "@/types/general";

// ========== QUERIES ==========

// Get all projects
export const useGetProjects = (params?: {
  title?: string;
  is_trashed?: boolean;
  page?: number;
  limit?: number;
  sortBy?: string;
}): UseQueryResult<ProjectListResponse["data"], Error> => {
  return useQuery({
    queryKey: ["projects", params],
    queryFn: async () => {
      const response = await projectService.GET_PROJECTS(params);
      return response.data;
    },
  });
};

// Get single project
export const useGetProject = (
  projectId: string
): UseQueryResult<Project, Error> => {
  return useQuery({
    queryKey: ["project", projectId],
    queryFn: async () => {
      const response = await projectService.GET_PROJECT(projectId);
      return response.data; // response is ProjectResponse, extract .data
    },
    enabled: !!projectId,
  });
};

// ========== MUTATIONS ==========

// Create project 
export const useCreateProject = (): UseMutationResult<
  ProjectResponse,
  Error,
  { title: string; description?: string }
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload) => projectService.CREATE_PROJECT(payload), // returns ProjectResponse
    onSuccess: (res) => {
      showToast.success(res.message || "Project created successfully");
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
    onError: (error: any) => {
      const errorMessage = parsedError(error, "Failed to create project.");
      showToast.error(errorMessage);
    },
  });
};

// Update project 
export const useUpdateProject = (): UseMutationResult<
  ProjectResponse,
  Error,
  { projectId: string; payload: { title?: string; description?: string } }
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ projectId, payload }) =>
      projectService.UPDATE_PROJECT(projectId, payload),
    onSuccess: (res, { projectId }) => {
      showToast.success(res.message || "Project updated successfully");
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["project", projectId] });
    },
    onError: (error: any) => {
      const errorMessage = parsedError(error, "Failed to update project.");
      showToast.error(errorMessage);
    },
  });
};

// Soft delete
export const useDeleteProject = (): UseMutationResult<
  ApiResponse,
  Error,
  { projectId: string }
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ projectId }) => projectService.DELETE_PROJECT(projectId),
    onSuccess: (res, { projectId }) => {
      showToast.success(res.message || "Project moved to trash");
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.removeQueries({ queryKey: ["project", projectId] });
    },
    onError: (error: any) => {
      const errorMessage = parsedError(error, "Failed to delete project.");
      showToast.error(errorMessage);
    },
  });
};

// Restore a trashed project 
export const useRestoreProject = (): UseMutationResult<
  ProjectResponse,
  Error,
  { projectId: string }
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ projectId }) => projectService.RESTORE_PROJECT(projectId),
    onSuccess: (res, { projectId }) => {
      showToast.success(res.message || "Project restored successfully");
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["project", projectId] });
    },
    onError: (error: any) => {
      const errorMessage = parsedError(error, "Failed to restore project.");
      showToast.error(errorMessage);
    },
  });
};

// Restore all tasks of a project
export const useRestoreProjectTasks = (): UseMutationResult<
  ApiResponse,
  Error,
  { projectId: string }
> => {
//   const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ projectId }) =>
      projectService.RESTORE_PROJECT_TASKS(projectId),
    onSuccess: (res) => {
      showToast.success(res.message || "All tasks restored successfully");
      // ! Invalidate tasks list here if you have one
    },
    onError: (error: any) => {
      const errorMessage = parsedError(error, "Failed to restore tasks.");
      showToast.error(errorMessage);
    },
  });
};
