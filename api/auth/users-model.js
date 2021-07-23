const db = require("../../data/dbConfig");

const createUser = (user) => {
  return db("users").insert(user);
};

const getUser = (user) => {
  return db("users").where({ username: user.username }).first();
};

module.exports = {createUser, getUser};
