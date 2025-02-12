const db = require('../../database/models')
const characterPerRealm = require('../../services/realmServices/admin.Services');

module.exports = async (req, res) => {
    try {
        const realms = await characterPerRealm();

        return res.status(200).json({
            Reino: realms
        });

    } catch (error) {
        console.log("Error al obtener los personajes:", error);
        res.status(500).send('Error en el controller');
    }
};