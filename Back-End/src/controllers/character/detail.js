const db = require('../../database/models')
const detailCharacter  = require('../../services/characterServices/detail.Services')

module.exports = async (req, res) => {
    try {
        const { id } = req.params;

        const character = await detailCharacter(id);

        return res.status(200).json({
            Personaje: character,
        });

    } catch (error) {
        console.error("Error al encontrar el personaje:", error.message);
        res.status(500).json({
            message: "Error al encontrar el personaje",
        });
    }
};