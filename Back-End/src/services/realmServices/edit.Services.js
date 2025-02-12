const db = require('../../database/models');

module.exports = async (id, data) => {
    try {
        const { name, image } = data;

        const existingRealm = await db.Realm.findByPk(id, {
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        });

        if (!existingRealm) {
            throw new Error("Reino no existe");
        }

        await existingRealm.update({
            name: name?.trim() || existingRealm.name,
            image: image || existingRealm.image
        });

        return existingRealm;

    } catch (error) {
        console.error('Error en el service:', error.message);
        throw new Error('Error en el service');
    }
};
