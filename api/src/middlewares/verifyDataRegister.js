import { User } from "../models/User.js";

// Verifica los datos del usuario cliente al registrarse
export const verifyDataRegisterClient = async (req, res, next) => {
    const { email, firstName, lastName, password, telUser } = req.body;

    if (!email || !firstName || !lastName || !password || !telUser) {
        res.status(401).send({ error: "Campo requerido" });
        return;
    }

    try {
        const userDb = await User.findOne({ email: email.toLowerCase() });

        if (userDb) {
            res.status(401).send({ error: "Correo electrónico en uso" });
            return;
        }

        next();
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: "Algo salió mal" });
        return;
    }
};


// Verifica los datos del usuario admin al registrarse
export const verifyDataRegisterAdmin = async (req, res, next) => {
    const { email, firstName, lastName, password, role, telUser } = req.body;

    if (!email || !firstName || !lastName || !password || !telUser) {
        res.status(401).send({ error: "Campo requerido" });
        return;
    }

    if (role !== "admin") {
        res.status(401).send({ error: "Rol no admitido" });
        return;
    }

    try {
        const userDb = await User.findOne({ email: email.toLowerCase() });

        if (userDb) {
            res.status(401).send({ error: "Correo electrónico en uso" });
            return;
        }

        next();
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: "Algo salió mal" });
        return;
    }
};
