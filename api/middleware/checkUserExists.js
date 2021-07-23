const Users = require('../auth/users-model');

module.exports = async (req, res, next) => {
    const user = await Users.getUser({username: req.body.username, password: req.body.password})
    if (!user) {
        next({status: 400, message: "invalid credentials"})
    } else {
        req.user = user;
    }
};
