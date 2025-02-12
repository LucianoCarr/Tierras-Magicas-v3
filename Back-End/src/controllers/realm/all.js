const allRealms = require('../../services/realmServices/all.Services')

module.exports = async (req, res) => {
    try {
        const realms = await allRealms()

        return res.status(200).json(
            realms
        );
        
    } catch (error) {
        console.log("Error al obtener los reinos:", error);
        res.status(500).send('Error en el controller');
    }
};