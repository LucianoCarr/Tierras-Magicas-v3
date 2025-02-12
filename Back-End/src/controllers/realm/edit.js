const db = require('../../database/models')
const editRealm = require('../../services/realmServices/edit.Services')
const { validationResult } = require('express-validator');

module.exports = async (req, res) => {
    try {
        const errors = validationResult(req)

        if (errors.isEmpty()) {

        const { name } = req.body;
        const { id } = req.params;

        let image;

        if (image && !(image.startsWith('http://') || image.startsWith('https://'))) {
            image = image;

        }else if (req.file) {
            image = req.file.filename;

        }else if (req.body.defaultImage) {
            image = "tierras-magicas.jpg";

        } else {
            image = req.body.image;
        }

        const updateRealm = {
            name,
            image
        };

        const editedRealm = await editRealm(id, updateRealm);

        return res.status(200).json({
            Reino: editedRealm
        });

    }

    } catch (error) {
        console.error("Error al editar el reino:", error.message);
        res.status(500).send('Internal Server Error');
    }
};
