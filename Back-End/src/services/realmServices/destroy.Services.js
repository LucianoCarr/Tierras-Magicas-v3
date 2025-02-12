const db = require('../../database/models');

module.exports = async (id) => {
    try {
          const realm = await db.Realm.findByPk(id);
        
                if (!realm) {
                    throw new Error('Reino no encontrado');
                }
        
        await db.Realm.destroy({
            where: {
                id: id
            }
        });

    } catch (error) {
        console.error('Error en el servicie:', error.message);
        throw new Error('Error en el service');
    }
};