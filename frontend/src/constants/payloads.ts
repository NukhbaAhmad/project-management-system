const payload = {
  auth: {
    register: ["name", "email", "username", "password"],
    login: ["identifier", "password"],
  },
  project: {
    create: ["title"],
    update: ["title"],
  },
  task: {
    create: ["title", "status", "project_id"],
    update: ["title", "status"],
  },
};

export default payload;
