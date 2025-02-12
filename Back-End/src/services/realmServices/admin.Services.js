const db = require('../../database/models');

module.exports = async () => {
    try {
        const realms = await db.Realm.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            },
            include: [
                {
                    association: 'characters',
                    attributes: ['id', 'name', 'image', 'realmId', 'elementId', 'power', 'description'],
                    /* order: [['id', 'ASC']], */
                    include: [
                        {
                            association: 'elements', 
                            attributes: ['name']
                        }
                    ]
                }
            ]
        });

        return realms;

    } catch (error) {
        console.error('Error en el service:', error.message);
        throw new Error('Error en el service');
    }
};
