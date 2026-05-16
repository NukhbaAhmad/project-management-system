const parsedError = (error: any, fallbackMessage: string): string => {
  const serverData = error?.response?.data;

  if (!serverData) return fallbackMessage;

  if (Array.isArray(serverData.errors) && serverData.errors.length > 0) {
    const bulletErrors = serverData.errors
      .map((err: { message: string; field?: string }) => `• ${err.message}`)
      .join("\n");

    return `${serverData.message || "Error"}:\n${bulletErrors}`;
  }

  return serverData.message || fallbackMessage;
};
export { parsedError };
