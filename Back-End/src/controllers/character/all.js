const db = require('../../database/models')
const allCharacters  = require('../../services/characterServices/all.Services')

module.exports = async (req, res) => {
    try {
        const characters = await allCharacters();

        const realms = await db.Realm.findAll({
            attributes: ['id', 'name']
        });
        const elements = await db.Element.findAll({
            attributes: ['id', 'name']
        });

        return res.status(200).json({
                characters,
                realms,
                elements
        });

    } catch (error) {
        console.log("Error al obtener los personajes:", error);
        res.status(500).send('Internal Server Error');
    }
};