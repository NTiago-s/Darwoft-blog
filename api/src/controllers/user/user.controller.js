import { User } from "../../models/User.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { resetPassword } from "../auth/nodemailerSend.js";
import cloudinary from "cloudinary";
import path from "path";
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Endpoint para obtener el perfil de un usuario
export const profile = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    return res.status(200).json(user);
  } catch (error) {
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
    return res
      .status(200)
      .redirect("https://darwoft-blog.onrender.com/users/active");
  } catch (error) {
    return res.status(500).json({ message: "Error al modificar el Usuario" });
  }
};

// Endpoint para modificar un usuario existente
export const updateUser = async (req, res) => {
  try {
    const { userId, firstName, lastName, email, telUser, imageUrl } = req.body;
    let urlImage;
    if (imageUrl) {
      const imageExt = path.extname(imageUrl).toLowerCase();
      const allowedExtensions = [".jpg", ".jpeg", ".png", ".webp"];
      if (!allowedExtensions.includes(imageExt)) {
        return res
          .status(400)
          .json({ message: "La extensión de la imagen no es válida" });
      }
      const maxUrlLength = 1024;
      if (Buffer.byteLength(imageUrl, "utf-8") > maxUrlLength) {
        return res.status(400).json({
          message:
            "El tamaño del enlace de la imagen excede el límite permitido (1MB)",
        });
      }
    }

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      urlImage = result.secure_url;
    }

    const updatedFields = {
      firstName,
      lastName,
      email,
      telUser,
    };

    if (imageUrl) {
      updatedFields.profileImage = imageUrl;
    }
    if (req.file) {
      updatedFields.profileImage = urlImage;
    } else if (req.body.image === "") {
      updatedFields.profileImage = "";
    }

    await User.findByIdAndUpdate(userId, updatedFields);
    const updatedUser = await User.findById(userId);

    res.status(200).json({ message: "Usuario Modificado", user: updatedUser });
  } catch (error) {
    console.error("Error al modificar el Usuario:", error);
    res.status(500).json({ message: "Error al modificar el Usuario" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { userId } = req.body;
    await User.findByIdAndDelete(userId);
    res.status(204).json({ message: "Usuario Eliminado" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el Usuario" });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: "Error al traer los Usuarios" });
  }
};

export const filterUsers = async (req, res) => {
  try {
    const { query } = req.query;
    const regex = new RegExp(query, "i");
    const users = await User.find({ firstName: regex });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error al traer los Usuarios" });
  }
};

export const adminEdit = async (req, res) => {
  try {
    const { userId, role, status } = req.body;
    const updatedFields = {};
    if (role !== undefined) {
      updatedFields.role = role;
    }

    if (status !== undefined) {
      updatedFields.status = status;
    }

    await User.findByIdAndUpdate(userId, updatedFields);
    const updatedUser = await User.findById(userId);
    res.status(200).json({ message: "Usuario Modificado", user: updatedUser });
  } catch (error) {
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
    console.log(password, userId);
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
    res.status(500).json({ message: "Error al modificar el Usuario" });
  }
};
