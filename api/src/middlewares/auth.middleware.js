import jwt from "jsonwebtoken";
import { User } from "../models/User.model.js";
import { logout } from "../controllers/auth/auth.controller.js";

export const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).send({ error: "No token provided" });
    return;
  }

  const parts = authHeader.split(" ");
  if (parts.length !== 2) {
    res.status(401).send({ error: "Token error" });
    return;
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    res.status(401).send({ error: "Token malformatted" });
    return;
  }

  const currentTimestamp = Math.floor(Date.now() / 1000);

  const decoded = jwt.decode(token, { complete: true });

  if (!decoded) {
    res.status(401).send({ error: "Token invalido" });
    return;
  }

  if (decoded.payload.exp) {
    if (decoded.payload.exp < currentTimestamp) {
      const signout = await logout(decoded.payload.id);

      if (signout.login === false) {
        res.status(401).send({
          error: "Token expirado",
          login: signout.login,
        });
        return;
      }
    }
  }
  req.body.userId = decoded.payload.id;
  next();
};

export const authResetPassword = async (req, res, next) => {
  try {
    const authHeader = req.body.token;
    if (!authHeader) {
      return res.status(401).send({ error: "No token provided" });
    }
    const decoded = jwt.verify(authHeader, process.env.JWT_SECRET);
    req.body.userId = decoded.id;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).send({ error: "Token expired" });
    } else if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).send({ error: "Invalid token" });
    } else {
      return res.status(500).send({ error: "Internal server error" });
    }
  }
};

// Verifica rol de cliente
export const authUserRolClient = async (req, res, next) => {
  try {
    const userId = req.body.userId;
    const userDb = await User.findById(userId);

    if (!userDb) {
      res.status(403).send({ error: "Autenticación fallida" });
      return;
    }

    if (!userDb.login) {
      res.status(403).send({ error: "Se requiere autenticación" });
      return;
    }

    if (userDb.role !== "client") {
      res.status(403).send({ error: "Autenticación fallida" });
      return;
    }

    next();
  } catch (error) {
    res.status(500).send({ error: "Error al autenticar el rol del usuario" });
    return;
  }
};

// Verifica rol de admin
export const authUserRolAdmin = async (req, res, next) => {
  try {
    const userId = req.body.userId;

    const userDb = await User.findById(userId);

    if (!userDb) {
      res.status(403).send({ error: "Autenticación fallida" });
      return;
    }

    if (!userDb.login) {
      res.status(403).send({ error: "Se requiere autenticación" });
      return;
    }

    if (userDb.role !== "admin") {
      res.status(403).send({ error: "Autenticación fallida" });
      return;
    }

    next();
  } catch (error) {
    res.status(500).send({ error: "Error al autenticar el rol del usuario" });
    return;
  }
};
