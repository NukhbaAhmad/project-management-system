interface ValidationResult {
  isValid: boolean;
  message: string;
}

export const validateFields = (
  data: Record<string, any>,
  fields: string[]
): ValidationResult => {
  const missingFields: string[] = [];

  fields.forEach((field) => {
    const value = data[field];
    if (value === undefined || value === null || String(value).trim() === "") {
      const readableName = field.charAt(0).toUpperCase() + field.slice(1);
      missingFields.push(readableName);
    }
  });

  if (missingFields.length > 0) {
    return {
      isValid: false,
      message: `${missingFields.join(", ")} ${missingFields.length > 1 ? "are" : "is"} required.`,
    };
  }

  return {
    isValid: true,
    message: "No error found",
  };
};
