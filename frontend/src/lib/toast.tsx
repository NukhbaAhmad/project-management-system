import toast from "react-hot-toast";

export const showToast = {
  success: (message: string, options?: Parameters<typeof toast.success>[1]) => {
    toast.dismiss();
    toast.success(message, options);
  },
  error: (message: string, options?: Parameters<typeof toast.error>[1]) => {
    toast.dismiss();
    toast.error(message, options);
  },
  loading: (message: string, options?: Parameters<typeof toast.loading>[1]) => {
    toast.dismiss();
    return toast.loading(message, options);
  },
  custom: toast.custom,
  dismiss: toast.dismiss,
};
