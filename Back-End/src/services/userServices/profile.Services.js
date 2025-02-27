const db = require("../../database/models");

module.exports = async (userId) => {
    try {
        const user = await db.User.findByPk(userId);
        console.log("Usuario encontrado en la base de datos:", user);  // Verifica el usuario

        if (!user) {
            throw { status: 404, message: "Usuario no encontrado" };
        }

        return user;
    } catch (error) {
        console.log("Error en el servicio de perfil:", error);
        throw {
            status: error.status || 500,
            message: error.message || "ERROR en el servicio de perfil",
        };
    }
};
