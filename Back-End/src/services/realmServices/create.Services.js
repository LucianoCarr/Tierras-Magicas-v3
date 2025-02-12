const db = require('../../database/models');

module.exports = async (data) => {
    try {
        const { name, image } = data;

        const newRealm = await db.Realm.create({
            name,
            image
        });

        return newRealm;
        
    } catch (error) {
        console.error('Error en el service:', error.message);
        throw new Error('Error en el service');
    }
};
