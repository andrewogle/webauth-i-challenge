const db = require("../dbConfig");

module.exports = {
  getUsers: () => {
    return db("users").select("id", "userName", "password");
  },
  findByID: id => {
    return db("users")
      .where({ id })
      .first();
  },
  findUser: filter => {
    return db("users").where(filter);
  },

  add: async user => {
    const [id] = await db("users").insert(user);

    return findByID(id);
  }
};
