const db = require('../../database/models');
const { validationResult } = require('express-validator');
const editCharacter = require('../../services/characterServices/edit.Services');

module.exports = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {

           /*  const errorMessages = errors.array().map(error => error.msg);
            return res.status(400).json({
                errors: errorMessages,
            }); */
        }

        const { id } = req.params;
        const { name, realmId, elementId, power, description } = req.body;

        let image;

        if (req.body.image && !(req.body.image.startsWith('http://') || req.body.image.startsWith('https://'))) {
            image = req.body.image; // Si no es una URL válida, usa el nombre de archivo
        } else if (req.file) {
            image = req.file.filename;  // Si se carga un archivo, usa el nombre del archivo
        } else if (req.body.defaultImage) {
            image = "tierras-magicas.jpg";  // Si se marca la casilla de imagen por defecto
        } else {
            image = req.body.image;  // Si no se carga un archivo, usa el valor existente de la imagen
        }

        const updateCharacter = {
            name,
            image,
            realmId,
            elementId,
            power, 
            description: description?.trim() || "Descripción no disponible"
        };

        const updatedCharacter = await editCharacter(id, updateCharacter);

        return res.status(200).json({
            Personaje: updatedCharacter,
        });


    } catch (error) {
        console.error('Error al editar el personaje:', error.message);
        return res.status(500).json({
            message: 'Error al editar el personaje',
        });
    }
};
