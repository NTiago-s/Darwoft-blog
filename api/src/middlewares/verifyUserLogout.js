import { User } from "../models/User.model.js";

// Verifica al usuario al cerrar sesión
export const verifyUserLogout = async (req, res, next) => {
  const userId = req.body.userId;
  if (!userId) {
    res.status(401).send({ error: "No autorizado" });
    return;
  }
  try {
    const userDb = await User.findById(userId);

    if (!userDb) {
      res.status(401).send({ error: "No autorizado" });
      return;
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Algo salió mal" });
  }
};
