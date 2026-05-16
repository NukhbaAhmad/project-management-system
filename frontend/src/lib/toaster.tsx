// lib/toaster.tsx
import { Toaster, ToastOptions } from "react-hot-toast";

const toastOptions: ToastOptions = {
  duration: 4000,
  style: {
    background: "#1e293b",
    color: "#f1f5f9",
    borderRadius: "12px",
    padding: "10px 18px",
    fontSize: "10px",
    fontWeight: "500",
    boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
  },
};

export const CustomToaster = () => {
  return (
    <Toaster
      position="top-right"
      toastOptions={toastOptions}
      reverseOrder={false}
      gutter={8}
      containerStyle={{ top: 20, right: 20 }}
    />
  );
};
