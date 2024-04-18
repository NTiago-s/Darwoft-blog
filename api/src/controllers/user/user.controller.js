import { User } from "../../models/User.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { resetPassword } from "../auth/nodemailerSend.js";
// Endpoint para obtener el perfil de un usuario
export const profile = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    const { firstName, lastName, email, role, telUser, image } = user;
    return res
      .status(200)
      .json({ firstName, lastName, email, role, telUser, image });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error del Servidor" });
  }
};
// Endpoint para activar un usuario existente
export const activeUser = async (req, res) => {
  try {
    const { token } = req.query;
    const decoded = jwt.decode(token, { complete: true });
    if (!decoded) {
      res.status(401).send({ error: "token invalido" });
      return;
    }
    const user = await User.findById(decoded.payload.id);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    user.state = "active";
    await user.save();
    return res.status(200).json({ message: "Cuenta activada con exito" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al modificar el Usuario" });
  }
};

// Endpoint para modificar un usuario existente
export const updateUser = async (req, res) => {
  try {
    const { userId, firstName, lastName, email, telUser } = req.body;
    // Buscar el usuario en la base de datos
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ message: "Usuario no encontrado" });
      return;
    }
    // Actualizar los datos del usuario
    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.telUser = telUser;
    await user.save();
    res.status(200).json({ message: "Usuario Modificado" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al modificar el Usuario" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { userId } = req.body;
    await User.findByIdAndDelete(userId);
    res.status(204).json({ message: "Usuario Eliminado" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar el Usuario" });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al traer los Usuarios" });
  }
};

export const prevResetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    // Buscar el usuario en la base de datosS
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ message: "Usuario no encontrado" });
      return;
    }
    // Actualizar los datos del usuario
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    await resetPassword(email, token);
    res.status(200).json({ token: token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al modificar el Usuario" });
  }
};

const passwordCrypt = async (pass) => {
  const saltOrRounds = 10;
  return await bcrypt.hash(pass, saltOrRounds);
};

export const resetPasswordController = async (req, res) => {
  try {
    const { password, userId } = req.body;
    // Buscar el usuario en la base de datos
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ message: "Usuario no encontrado" });
      return;
    }
    // Actualizar los datos del usuario
    const criptpass = await passwordCrypt(password);
    user.password = criptpass;
    await user.save();
    res.status(200).json({ message: "Usuario Modificado" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al modificar el Usuario" });
  }
};
