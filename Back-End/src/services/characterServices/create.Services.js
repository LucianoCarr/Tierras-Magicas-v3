const db = require('../../database/models');

module.exports = async (data) => {
  try {
    const {name, image, realmId, description, power, elementId} = data
    
    const newCharacter = await db.Character.create({
        name,
        image,
        realmId: realmId,
        power,
        elementId: elementId,
        description
        },
        {
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        }
    });

    return newCharacter; 


  } catch (error) {
    console.error('Error en el servicio:', error.message);
    throw new Error('Error en el servicio');
  }
}
