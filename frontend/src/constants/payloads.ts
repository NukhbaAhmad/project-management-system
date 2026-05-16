const payload = {
  auth: {
    register: ["name", "email", "username", "password"],
    login: ["identifier", "password"],
  },
  project: {
    create: ["title"],
    update: ["title"],
  },
};

export default payload;
