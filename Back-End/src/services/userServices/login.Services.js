const db = require("../../database/models");
const { compareSync } = require("bcryptjs");

module.exports = async (email, password) => {
    try {
        const user = await db.User.findOne({ where: { email } });

        if (!user) {
            throw { status: 404, message: "Usuario no encontrado" };
        }

        const isPasswordValid = compareSync(password, user.password);

        if (!isPasswordValid) {
            throw { status: 400, message: "Contraseña incorrecta" };
        }

        return user;

    } catch (error) {
        console.log(error);
        throw {
            status: error.status || 500,
            message: error.message || "ERROR en el servicio de login"
        };
    }
};
