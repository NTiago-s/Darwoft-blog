import bcrypt from "bcrypt";
import { User } from "../models/User.model.js";

const verifyPassBcrypt = (userpass, password) => {
  return bcrypt.compareSync(password, userpass);
};

export const verifyDataLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(401).json({ error: "Campo requerido" });
      return;
    }

    const clientdb = await User.findOne({ email: email.toLowerCase() });

    if (!clientdb) {
      res
        .status(404)
        .json({ error: "Correo electrónico o contraseña incorrectos." });
      return;
    }
    const compareBcrypt = verifyPassBcrypt(
      clientdb.password.trim(),
      password.trim()
    );
    if (!compareBcrypt) {
      res
        .status(404)
        .json({ error: "Correo electrónico o contraseña incorrectos." });
      return;
    }

    if (clientdb.state !== "active") {
      res.status(403).json({
        error:
          "Tu cuenta está desactivada, verifica tu correo electrónico para activar tu cuenta.",
      });
      return;
    }
    next();
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al verificar los datos de inicio de sesión" });
  }
};
