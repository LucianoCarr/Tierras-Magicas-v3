module.exports = (req, res, next) => {
    if (req.session.userLogin) {
        return res.status(400).json({ message: "Ya estás logueado" });
    }
    next(); // Si no está logueado, permite acceso a login/register
};
