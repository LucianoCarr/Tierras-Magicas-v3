const { validationResult } = require("express-validator");
const { loginUser } = require("../../services/userServices/login.Services");

module.exports = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.mapped() });
        }

        const { email, password } = req.body;

        const user = await loginUser(email, password);
        console.log("Usuario logueado exitosamente", user);

        // Crear la sesión del usuario
        req.session.userLogin = user.id; // O puedes guardar más información si es necesario

        return res.status(200).json({
            message: "Login exitoso",
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
        });

    } catch (error) {
        return res.status(error.status || 500).json({
            ok: false,
            status: error.status || 500,
            error: error.message || "Error en el login",
        });
    }
};
