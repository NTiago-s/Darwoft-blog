import { User } from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { nodemailerSend } from "./nodemailerSend.js";

const JWT_SECRET = process.env.JWT_SECRET;

// poner la primera letra de un nombre en mayúscula
export const capitalizeFirstLetter = (nombre) => {
  return nombre.charAt(0).toUpperCase() + nombre.slice(1).toLowerCase();
};

// Endpoint genera el token para los usuarios
export const newToken = (userId) => {
  const currentTimestamp = Date.now();
  const expirationTimestamp = currentTimestamp + 24 * 60 * 60 * 1000;
  const payload = {
    id: userId,
    exp: Math.floor(expirationTimestamp / 1000),
  };
  return jwt.sign(payload, JWT_SECRET);
};

// se encripta el password
const passwordCrypt = async (pass) => {
  const saltOrRounds = 10;
  return await bcrypt.hash(pass, saltOrRounds);
};

// Endpoint registra al usuario cliente
export const registerUsers = async (dataUser) => {
  const { email, firstName, lastName, password, role, telUser } = dataUser;
  const criptpass = await passwordCrypt(password);
  const data = {
    telUser: telUser,
    email: email.toLowerCase(),
    password: criptpass,
    role: role,
    firstName: capitalizeFirstLetter(firstName),
    lastName: capitalizeFirstLetter(lastName),
  };

  try {
    const newUser = new User(data);
    await newUser.save();
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
    await nodemailerSend(email, token);
    return { message: "Successfull registration" };
  } catch (error) {
    console.log(error);
    throw new Error("something went wrong with the registry");
  }
};

// Endpoint para loquear a los usuarios
export const loginUsers = async (email) => {
  try {
    const userClientDb = await User.findOneAndUpdate(
      { email: email },
      { login: true },
      { new: true }
    );
    const tokenJwt = newToken(userClientDb._id);
    return {
      firstName: userClientDb.firstName,
      lastName: userClientDb.lastName,
      email: userClientDb.email,
      role: userClientDb.role,
      image: userClientDb.image,
      login: userClientDb.login,
      accessToken: tokenJwt,
    };
  } catch (error) {
    console.log(error);
    throw new Error("An error occurred");
  }
};

// Endpoint cerrar sesión del los usuarios
export const logout = async (userId) => {
  try {
    const logoutUser = await User.findByIdAndUpdate(
      userId,
      { login: false },
      { new: true }
    );
    return logoutUser;
  } catch (error) {
    console.log(error);
    throw new Error("something went wrong");
  }
};
