const db = require('../../database/models');
const { hashSync } = require('bcryptjs');

module.exports = async (userData) => {
    try {
        const { name, lastName, email, password } = userData;

        const user = await db.User.create({
            name,
            lastName,
            email,
            password: hashSync(password, 10),
        });

        return user;

    } catch (error) {
        console.log(error);
        throw {
          status: error.status || 500,
          message: error.message || "ERROR en el servicio"
        };
    }
}
