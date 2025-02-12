const db = require('../../database/models')

module.exports = async () => {
    try {
        const characters = await db.Character.findAll({
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

        return characters;
    } catch (error) {
        console.error('Error en el service:', error.message);
        throw new Error('Error en el service');
    }
};