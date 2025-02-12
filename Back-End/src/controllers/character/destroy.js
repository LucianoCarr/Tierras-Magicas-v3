const deleteCharacter = require('../../services/characterServices/destroy.Services')

module.exports = async (req, res) => {
    try {
            await deleteCharacter(req.params.id);
            
            return res.status(200).json({
                message: 'Personaje eliminado exitosamente'
            });
            
        } catch (error) {
            console.error('Error eliminando el personaje en el controlador:', error.message);
            res.status(500).send('Error en el controlador');
        }
}