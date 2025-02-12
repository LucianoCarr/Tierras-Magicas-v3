const deleteRealm = require('../../services/realmServices/destroy.Services')

module.exports = async (req, res) => {
    try {
        await deleteRealm(req.params.id);
            
        return res.status(200).json({
            message: 'Reino eliminado exitosamente'
        });

    } catch (error) {
        console.error('Error eliminando el reino en el controlador:', error.message);
        res.status(500).send('Error en el controlador');
    }
}