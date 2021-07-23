module.exports = (req, res, next) => {
    if (!req.body.username || !req.body.password) {
        req.user = { username: req.body.username.trim(), password: req.body.password.trim() }
        next({status: 400, message: "username and password required"})
    } else {next()}
}