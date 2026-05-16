import axiosInstance from "./axiosInstance";
import { DashboardStats } from "@/types/dashboard";

export const dashboardService = {
  GET_STATS: async (): Promise<DashboardStats> => {
    const { data } = await axiosInstance.get<{
      status: number;
      data: DashboardStats;
    }>("/dashboard");
    return data.data;
  },
};
