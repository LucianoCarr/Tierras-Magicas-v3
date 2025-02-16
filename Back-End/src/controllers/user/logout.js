module.exports = (req, res) => {
    try {
        // Eliminar la sesión del usuario
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).json({
                    message: "Hubo un error al cerrar sesión",
                    error: err.message,
                });
            }

            return res.status(200).json({
                message: "Logout exitoso",
            });
        });
    } catch (error) {
        return res.status(500).json({
            message: "Hubo un error al cerrar sesión",
            error: error.message,
        });
    }
};
