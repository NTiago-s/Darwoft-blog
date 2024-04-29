const nameRegex = /^[A-Za-z\s]+$/;
const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
const phoneRegex = /^[+\d\s]+$/;

export const validatePhone = (value) => {
  if (!value) {
    return "Ingresa un número de teléfono";
  }
  if (!phoneRegex.test(value)) {
    return "Número de teléfono inválido. Por favor, ingresa un formato válido.";
  }
};

export const validateNombre = (value) => {
  if (value.trim() === "") {
    return "Ingresa tu Nombre el campo no debe estar vacio";
  }
  if (!nameRegex.test(value)) {
    return "El Nombre solo puede contener letras";
  }
};

export const validateApellido = (value) => {
  if (!value) {
    return "Ingresa tu Apellido el campo no debe estar vacio";
  }
  if (!nameRegex.test(value)) {
    return "El Apellido solo puede contener letras";
  }
};

export const validateCountry = (value) => {
  if (!value) {
    return "Ingresa tu Pais el campo no debe estar vacio";
  }
  if (!nameRegex.test(value)) {
    return "el pais solo puede contener letras";
  }
};

export const validateCity = (value) => {
  if (!value) {
    return "Ingresa tu Ciudad el campo no debe estar vacio";
  }
  if (!nameRegex.test(value)) {
    return "La Ciudad solo puede contener letras";
  }
};

export const validateEmail = (value) => {
  if (!value) {
    return "Ingresa un Email el campo no debe estar vacio";
  }
  if (!emailRegex.test(value)) {
    return "Correo electrónico inválido el correo debe contener {@ .}";
  }
};

export const validatePassword = (value) => {
  if (!value) {
    return "Ingresa una Contraseña el campo no debe estar vacio";
  }
  if (!passwordRegex.test(value)) {
    return "La contraseña debe tener al menos 8 caracteres, una letra mayúscula , minúscula y un numero.";
  }
};
