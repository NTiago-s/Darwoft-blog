import { User } from "../models/User.model.js";

// Verifica al usuario al cerrar sesión
export const verifyUserLogout = async (req, res, next) => {
  try {
    const userId = req.body.userId;
    if (!userId) {
      res.status(401).json({ error: "No autorizado" });
      return;
    }
    const userDb = await User.findById(userId);

    if (!userDb) {
      res.status(401).json({ error: "No autorizado" });
      return;
    }
    next();
  } catch (error) {
    res.status(500).json({ error: "Algo salió mal" });
  }
};
