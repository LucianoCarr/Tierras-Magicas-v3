module.exports = (req, res, next) => {
    if (!req.session.userLogin) {
        return res.status(401).json({ message: "No autorizado, debes iniciar sesión" });
    }    
    next(); // Si está logueado, permite el acceso
};
