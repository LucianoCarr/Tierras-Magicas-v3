/* const { validationResult } = require("express-validator");
const loginUser = require("../../services/userServices/login.Services");

module.exports = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.mapped() });
        }

        const { email, password } = req.body;

        // Llamada al servicio para verificar el login
        const user = await loginUser(email, password);
        console.log("Usuario logueado exitosamente", user);

        // Crear una sesión para el usuario
        req.session.userLogin = {
            id: user.id,
            name: user.name,
            email: user.email,
        };

        return res.status(200).json({
            message: "Inicio de sesión exitoso",
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
            error: error.message || "¡Huuu, hubo un error en el login! :c",
        });
    }
};
 */




const { validationResult } = require("express-validator");
const db = require("../../database/models");
const { compareSync } = require("bcryptjs");

module.exports = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.mapped() });
        }

        const { email, password } = req.body;
        const user = await db.User.findOne({ where: { email } });

        if (!user || !compareSync(password, user.password)) {
            return res.status(401).json({ message: "Credenciales inválidas" });
        }

        // Guardar información en la sesión
        req.session.userLogin = {
            id: user.id,
            name: user.name,
            email: user.email,
        };

        console.log("Sesión iniciada con el usuario:", req.session.userLogin);  // Verifica la sesión

        return res.status(200).json({
            message: "Login exitoso",
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
        });
    } catch (error) {
        console.error("Error en login:", error);
        return res.status(500).json({
            message: "Hubo un error en el proceso de login",
            error: error.message,
        });
    }
};
