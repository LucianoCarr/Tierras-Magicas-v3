const db = require('../../database/models');

module.exports = async (id) => {
    try {
        const realm = await db.Realm.findByPk(id, {
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            },
            include: [
                {
                    association: 'characters',
                    attributes: ['id', 'name', 'image', 'realmId', 'elementId', 'power', 'description'],
                    include: [
                        {
                            association: 'realms',
                            attributes: ['name']
                        },
                        {
                            association: 'elements',
                            attributes: ['name']
                        }
                    ]
                }
            ]
        });


       /*  const realms = await db.Character.findAll({
            where: {realmId},
            attributes: ['id', 'name', 'image', 'realmId', 'elementId', 'power', 'description'],
            include: [
                {
                    association: 'realms',
                    attributes: ['name']
                },
                {
                    association: 'elements',
                    attributes: ['name']
                }
            ]
        }); */

        return realm;

    } catch (error) {
        console.error('Error en el service:', error.message);
        throw new Error('Error en el service');
    }
};
