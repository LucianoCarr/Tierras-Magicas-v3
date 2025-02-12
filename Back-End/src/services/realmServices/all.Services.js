const db = require('../../database/models')

module.exports = async () => {
    try {
        const realms = await db.Realm.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        })

        return realms
        
    } catch (error) {
        console.error('Error en el service:', error.message);
        throw new Error('Error en el service');
    }
}