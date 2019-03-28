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
  finduser: filter => {
    return db("users").where(filter);
  },

  add: user => {
    const [id] = db("users").insert(user);

    return findByID(id);
  }
};
