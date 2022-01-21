module.exports = function protectUsersRoute(req, res, next) {
    if (req.session.currentUser._id === req.params.id) next();
    else res.redirect("/users");
}