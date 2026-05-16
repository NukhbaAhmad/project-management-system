import { SVGProps } from "react";

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
}
interface ApiResponse {
  status: number;
  message: string;
}

export type { IconProps, ApiResponse };
