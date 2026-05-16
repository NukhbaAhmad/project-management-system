export interface Task {
  id: string;
  project_id: string;
  title: string;
  description: string;
  status: "pending" | "in_progress" | "completed";
  is_trashed: boolean;
  created_by: string;
  createdAt: string;
  updatedAt: string;
}

export interface TaskListResponse {
  status: number;
  data: {
    total: number;
    page: number;
    count: number;
    pages: number;
    results: Task[];
  };
}

export interface TaskResponse {
  status: number;
  data: Task;
  message?: string;
}
