const db = require('../../database/models')

module.exports = async (id) => {
    try {
        const character = await db.Character.findByPk(id, {
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            },
            include: [
                {
                    association: 'realms',
                    attributes: ['id', 'name']
                },
                {
                    association: 'elements',
                    attributes: ['id', 'name']
                }
            ]
        });

        if (!character) {
            throw new Error('Personaje no encontrado');
        }

        return character;
    } catch (error) {
        console.error('Error en el service:', error.message);
        throw new Error('Error en el service');
    }
};