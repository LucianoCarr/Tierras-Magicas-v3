const db = require('../../database/models');

const loginUser = async (email, password) => {
    try {
        const user = await db.User.findOne({ where: { email } });

        if (!user) {
            throw { status: 404, message: 'Usuario no encontrado' };
        }

        // Aquí podrías agregar la validación de la contraseña si fuera necesario
        // Por ejemplo, usando bcrypt para comparar las contraseñas hasheadas
        if (user.password !== password) {
            throw { status: 401, message: 'Contraseña incorrecta' };
        }

        return user;
    } catch (error) {
        throw {
            status: error.status || 500,
            message: error.message || "Error en el servicio",
        };
    }
};

module.exports = { loginUser };
