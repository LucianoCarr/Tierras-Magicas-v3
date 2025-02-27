const getUserProfile = require("../../services/userServices/profile.Services");

module.exports = async (req, res) => {
    try {
        if (!req.session.userLogin) {
            return res.status(401).json({
                message: "No autorizado, debes iniciar sesión primero",
            });
        }

        const userId = req.session.userLogin.id;  // Obtiene el ID de la sesión
        console.log("User ID desde la sesión:", userId);

        const user = await getUserProfile(userId); // Llama al servicio para obtener el perfil

        return res.status(200).json({
            message: "Perfil obtenido con éxito",
            user: {
                id: user.id,
                name: user.name,
                lastName: user.lastName,
                email: user.email,
            },
        });
    } catch (error) {
        console.error("Error al obtener perfil:", error);
        return res.status(error.status || 500).json({
            message: "Hubo un error al obtener el perfil",
            error: error.message,
        });
    }
};
