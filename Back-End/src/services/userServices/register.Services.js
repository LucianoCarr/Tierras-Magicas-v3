const db = require('../../database/models')

const createUser = async (userData) => {
    try {
        const { name, lastName, email, password, birthday, province } = userData;
        
        const user = await db.User.create({
            name ,
            lastName,
            email,
            password,
            birthday,
            province: null
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