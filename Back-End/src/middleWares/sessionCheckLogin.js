module.exports = (req, res, next) => {
    if (!req.session.userLogin) {
        return res.redirect('/user/login'); // Si no está logueado, redirige a login
    } else {
        return res.redirect('/'); // Si está logueado, redirige a la vista principal
    }
}
