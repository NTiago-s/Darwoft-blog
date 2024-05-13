import { User } from "../models/User.model.js";

const verifyData = (data) => {
  if (
    !data.email ||
    !data.firstName ||
    !data.lastName ||
    !data.password ||
    !data.telUser
  ) {
    res.status(401).json({ error: "Campo requerido" });
    return;
  }
};

// Verifica los datos del usuario cliente al registrarse
export const verifyDataRegisterClient = async (req, res, next) => {
  try {
    const body = req.body;
    verifyData(body);

    const userDb = await User.findOne({ email: body.email.toLowerCase() });

    if (userDb) {
      res.status(401).json({ error: "Correo electrónico en uso" });
      return;
    }

    next();
  } catch (error) {
    res.status(500).json({ error: "Algo salió mal" });
    return;
  }
};

// Verifica los datos del usuario admin al registrarse
export const verifyDataRegisterAdmin = async (req, res, next) => {
  try {
    const body = req.body;
    verifyData(body);

    if (body.role !== "admin") {
      res.status(401).json({ error: "Rol no admitido" });
      return;
    }
    const userDb = await User.findOne({ email: body.email.toLowerCase() });
    if (userDb) {
      res.status(401).json({ error: "Correo electrónico en uso" });
      return;
    }

    next();
  } catch (error) {
    res.status(500).json({ error: "Algo salió mal" });
    return;
  }
};
