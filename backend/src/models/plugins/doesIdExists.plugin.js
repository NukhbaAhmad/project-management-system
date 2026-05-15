const doesIdExists = (schema) => {
  if (!schema) {
    throw new ApiError({
      statusCode: httpStatus.BAD_REQUEST,
      message: "User Schema is required.",
    });
  }
  schema.statics.doesIdExists = async function (id) {
    const user = await this.findById(id);
    return !!user; // true if exists false if doesnt exists
  };
};

module.exports = doesIdExists;
