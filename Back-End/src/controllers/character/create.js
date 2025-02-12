const db = require('../../database/models');
const { validationResult } = require('express-validator');
const createCharacter = require('../../services/characterServices/create.Services');


module.exports = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {

 /*      return res.status(400).json({
        errors: errors.mapped(),
        old: req.body,
    }); */
    }

    const { name, image, realmId, elementId, power, description } = req.body;

    const newCharacter = {
      name: name?.trim(),
      image: image,
      realmId,
      elementId,
      power: +power,
      description: description?.trim() || "Descripción no disponible"
    };

    if (image && (image.startsWith('http://') || image.startsWith('https://'))) {
        newCharacter.image = image; // Utiliza la URL proporcionada
    } else if (req.file) {
        newCharacter.image = req.file.filename; // Utiliza la imagen cargada localmente
    } else {
        newCharacter.image = "tierras-magicas.jpg"; // Imagen por defecto si no se proporciona ninguna
    }


    const createdCharacter = await createCharacter(newCharacter);

    return res.status(201).json({
      Personaje: createdCharacter,
    });


  } catch (error) {
    console.error('Error al crear el personaje:', error.message);
    return res.status(500).json({
      message: 'Error al crear el personaje',
    });
  }
};
