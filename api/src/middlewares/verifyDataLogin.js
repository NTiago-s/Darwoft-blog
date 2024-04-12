import bcrypt from "bcrypt";
import { User } from "../models/User.js";

const verifyPassBcrypt = (userpass, password) => {
  return bcrypt.compareSync(password, userpass);
};

export const verifyDataLogin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(401).send({ error: "Campo requerido" });
    return;
  }

  try {
    const clientdb = await User.findOne({ email: email.toLowerCase() });

    if (!clientdb || clientdb === null) {
      res
        .status(404)
        .send({ error: "Correo electrónico o contraseña incorrectos." });
      return;
    }
    const compareBcrypt = verifyPassBcrypt(
      clientdb.password.trim(),
      password.trim()
    );
    if (!compareBcrypt) {
      res
        .status(404)
        .send({ error: "Correo electrónico o contraseña incorrectos." });
      return;
    }

    if (clientdb.state !== "active") {
      res.status(403).send({
        error:
          "Tu cuenta está desactivada, verifica tu correo electrónico para activar tu cuenta.",
      });
      return;
    }
    next();
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ error: "Error al verificar los datos de inicio de sesión" });
  }
};
