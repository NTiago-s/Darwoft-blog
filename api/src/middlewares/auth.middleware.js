import jwt from "jsonwebtoken";
import { User } from "../models/User.model.js";

export const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ error: "No token provided" });
    return;
  }

  const currentTimestamp = Math.floor(Date.now() / 1000);

  try {
    const decoded = jwt.verify(authHeader, process.env.JWT_SECRET);

    if (!decoded) {
      res.status(401).json({ error: "Token inválido" });
      return;
    }

    if (decoded.exp < currentTimestamp) {
      res.status(401).json({ error: "Token expirado" });
      return;
    }

    req.body.userId = decoded.id;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      res.status(401).json({ error: "Token expirado" });
      return;
    }
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const authResetPassword = async (req, res, next) => {
  try {
    const authHeader = req.body.token;
    if (!authHeader) {
      return res.status(401).json({ error: "No token provided" });
    }
    const decoded = jwt.verify(authHeader, process.env.JWT_SECRET);
    req.body.userId = decoded.id;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ error: "Token expired" });
    } else if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ error: "Invalid token" });
    } else {
      return res.status(500).json({ error: "Internal server error" });
    }
  }
};

// Verifica rol de cliente
export const authUserRolClient = async (req, res, next) => {
  try {
    const userId = req.body.userId;
    const userDb = await User.findById(userId);

    if (!userDb || !userDb.login || userDb.role !== "client") {
      res.status(403).json({ error: "Autenticación fallida" });
      return;
    }
    next();
  } catch (error) {
    res.status(500).json({ error: "Error al autenticar el rol del usuario" });
    return;
  }
};

// Verifica rol de admin
export const authUserRolAdmin = async (req, res, next) => {
  try {
    const userId = req.body.userId;
    const userDb = await User.findById(userId);

    if (!userDb || !userDb.login || userDb.role !== "admin") {
      res.status(403).json({ error: "Autenticación fallida" });
      return;
    }
    next();
  } catch (error) {
    res.status(500).json({ error: "Error al autenticar el rol del usuario" });
    return;
  }
};
