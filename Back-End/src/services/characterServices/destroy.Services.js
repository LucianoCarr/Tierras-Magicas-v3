const db = require('../../database/models');

module.exports = async (id) => {
    try {
        // Verifica si el personaje existe antes de intentar eliminarlo
        const character = await db.Character.findByPk(id);

        if (!character) {
            throw new Error('Personaje no encontrado');
        }

        // Si el personaje existe, lo elimina
        await db.Character.destroy({
            where: {
                id: id
            }
        });
    } catch (error) {
        console.error('Error en el service:', error.message);
        throw new Error('Error en el service');
    }
};
