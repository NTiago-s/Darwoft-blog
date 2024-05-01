import { User } from "../../models/User.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { nodemailerSend } from "./nodemailerSend.js";

//Borra las propiedades que recibe por parametro y devuelve un objeto nuevo
function removeProperties(obj, properties) {
  const newObj = { ...obj };
  properties.forEach((prop) => {
    delete newObj[prop];
  });
  return newObj;
}

// poner la primera letra de un nombre en mayúscula
export const capitalizeFirstLetter = (nombre) => {
  return (
    nombre.charAt(0).toUpperCase().trim() + nombre.slice(1).toLowerCase().trim()
  );
};

// Endpoint genera el token para los usuarios
export const newToken = (userId) => {
  const currentTimestamp = Date.now();
  const expirationTimestamp = currentTimestamp + 24 * 60 * 60 * 1000;
  const payload = {
    id: userId,
    exp: Math.floor(expirationTimestamp / 1000),
  };
  return jwt.sign(payload, process.env.JWT_SECRET);
};

// se encripta el password
const passwordCrypt = async (pass) => {
  return await bcrypt.hash(pass, 10);
};

// Endpoint registra al usuario
export const registerUsers = async (req, res) => {
  try {
    const { email, firstName, lastName, password, role, telUser } = req.body;
    const criptpass = await passwordCrypt(password);
    const data = {
      telUser: telUser,
      email: email.toLowerCase(),
      password: criptpass,
      role: role,
      firstName: capitalizeFirstLetter(firstName),
      lastName: capitalizeFirstLetter(lastName),
    };

    const newUser = new User(data);
    await newUser.save();
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
    await nodemailerSend(email, token);
    return res.status(200).json({ message: "Successfull registration", token });
  } catch (error) {
    throw new Error("something went wrong with the registry");
  }
};

// Endpoint para loguear a los usuarios
export const loginUsers = async (req, res) => {
  try {
    const { email } = req.body;
    const userClientDb = await User.findOneAndUpdate(
      { email: email.toLowerCase() },
      { login: true },
      { new: true }
    );
    const cleanUser = removeProperties(userClientDb.toJSON(), [
      "__v",
      "password",
    ]);
    const tokenJwt = newToken(userClientDb._id);
    return res.status(200).json({
      data: cleanUser,
      accessToken: tokenJwt,
    });
  } catch (error) {
    throw new Error("An error occurred");
  }
};

// Endpoint cerrar sesión del los usuarios
export const logout = async (req, res) => {
  try {
    const { userId } = req.body;
    const logoutUser = await User.findByIdAndUpdate(
      userId,
      { login: false },
      { new: true }
    );
    const user = removeProperties(logoutUser.toJSON(), [
      "__v",
      "password",
      "telUser",
      "_id",
    ]);
    res.status(200).json(user);
  } catch (error) {
    throw new Error("something went wrong");
  }
};
