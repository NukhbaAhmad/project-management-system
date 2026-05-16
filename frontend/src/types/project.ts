export interface Project {
  id: string;
  title: string;
  description: string;
  created_by: string;
  is_trashed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectListResponse {
  status: number;
  data: {
    total: number;
    page: number;
    count: number;
    pages: number;
    results: Project[];
  };
}

export interface ProjectResponse {
  status: number;
  data: Project;
  message?: string;
}
