const createRealm = require('../../services/realmServices/create.Services')
const {validationResult} = require('express-validator')

module.exports = async (req, res) => {
    try {
        const errors = validationResult(req)

        if (errors.isEmpty()) {

        const {name, image} = req.body

        const newRealm = {
            name: name?.trim(),
            image: image
        };

            if (image && (image.startsWith('http://') || image.startsWith('https://'))) {
                newRealm.image = image; 
            } else if (req.file) {
                newRealm.image = req.file.filename; 
            } else {
                newRealm.image = "tierras-magicas.jpg"; 
            }

        const createdRealm = await createRealm(newRealm)
        
        
        return res.status(201).json({
          Reino: createdRealm
      });
  }
  
    } catch (error) {
        console.log("Error al crear los reinos:", error);
        res.status(500).send('Internal Server Error');
    }
}