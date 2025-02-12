const characterPerRealm = require('../../services/realmServices/detail.Services')

module.exports = async (req, res) => {
        try {
            const charactersInRealm = await characterPerRealm(req.params.id)
            
            return res.status(200).json({
                Reino: charactersInRealm
            });
            
        } catch (error) {
            console.log("Error al obtener los personajes por reino:", error);
            res.status(500).send('Error en el controller');
        }
    }