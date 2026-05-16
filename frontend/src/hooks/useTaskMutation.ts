import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { taskService } from "@/api/taskService";
import { TaskListResponse, TaskResponse } from "@/types/task";
import { showToast } from "@/lib/toast";
import { parsedError } from "@/lib/errorHandler";

// ---------- QUERY ----------
export const useTasks = (params: {
  project_id?: string;
  title?: string;
  status?: "pending" | "in_progress" | "completed";
  is_trashed?: boolean;
  page: number;
  limit: number;
}) => {
  return useQuery({
    queryKey: ["tasks", params],
    queryFn: () => taskService.GET_TASKS(params),
    select: (res: TaskListResponse) => ({
      tasks: res.data.results,
      pagination: {
        page: res.data.page,
        pages: res.data.pages,
        total: res.data.total,
        limit: res.data.count || params.limit,
      },
    }),
  });
};

// ---------- MUTATIONS ----------
export const useCreateTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: Parameters<typeof taskService.CREATE_TASK>[0]) =>
      taskService.CREATE_TASK(payload),
    onSuccess: (res: TaskResponse) => {
      showToast.success(res.message || "Task created");
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: (error: any) => {
      showToast.error(parsedError(error, "Creation failed"));
    },
  });
};

export const useUpdateTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: Parameters<typeof taskService.UPDATE_TASK>[1];
    }) => {
      const { project_id, ...cleanPayload } = payload as any;
      return taskService.UPDATE_TASK(id, cleanPayload);
    },
    onSuccess: (res: TaskResponse) => {
      showToast.success(res.message || "Task updated");
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: (error: any) => {
      showToast.error(parsedError(error, "Update failed"));
    },
  });
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => taskService.DELETE_TASK(id),
    onSuccess: () => {
      showToast.success("Task moved to trash");
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: (error: any) => {
      showToast.error(parsedError(error, "Delete failed"));
    },
  });
};

export const useRestoreTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => taskService.RESTORE_TASK(id),
    onSuccess: (res: TaskResponse) => {
      showToast.success(res.message || "Task restored");
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: (error: any) => {
      showToast.error(parsedError(error, "Restore failed"));
    },
  });
};
