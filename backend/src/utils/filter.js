const applyStringFilters = (filters, stringFields) => {
  stringFields.forEach((field) => {
    if (filters[field]) {
      filters[field] = { $regex: filters[field], $options: "i" };
    }
  });
  return filters;
};

module.exports = { applyStringFilters };
