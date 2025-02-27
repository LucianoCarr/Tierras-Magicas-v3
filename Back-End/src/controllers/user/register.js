const db = require("../../database/models");
const { validationResult } = require("express-validator");
const createUser = require("../../services/userServices/register.Services");

module.exports = async (req, res) => {
    try {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
        const { name, lastName, email, password  } = req.body;

        const userData = {
            name,
            lastName,
            email,
            password
        };

        const newUser = await createUser(userData);
        console.log("usuario creado exitosamente", newUser);

        return res.status(201).json({
            message: "Usuario registrado exitosamente",
            user: newUser,
        });

    } else {
        return res.status(400).json({ errors: errors.mapped() });
    }
} catch (error) {
    return res.status(error.status || 500).json({
        ok: false,
        status: error.status || 500,
        error: error.message || "¡Huuu, hubo un error! :c",
    });
}
};
