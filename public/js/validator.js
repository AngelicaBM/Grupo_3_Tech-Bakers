// expresiones regulares

const RegExpEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i;
const RegExpPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/i;
const RegExpAvatar = /(.jpg|.jpeg|.png|.gif)$/i;
const RegExpCaracter = /[$&+,:;=?#|'<>^*()%!]/;
const RegExpWords = /^(select)$|^(from)$/;

// validadores

let filled = (value) => value !== "";
let length = (value) => value.length < 2;
let productLength = (value) => value.length < 5;
let passLength = (value) => value.length > 8;

// common functions

const emailValidator = (field, errorField) => {
  let errors = "";
  emailValue = field.value.trim();

  if (!filled(emailValue)) {
    errors = "Debes ingresar un Email";
  } else if (!emailValue.match(RegExpEmail)) {
    errors = "Debes ingresar un formato válido de Email";
  }

  errors = securityValidator(emailValue, errors);
  errorField.innerText = errors;
};

const passwordValidator = (field, errorField) => {
  let errors = "";
  passwordValue = field.value.trim();

  if (!filled(passwordValue)) {
    errors = "Debes ingresar un Password";
  } else if (!passLength(passwordValue)) {
    errors = "Tu contraseña debe tener al menos 8 carácteres";
  } else if (!passwordValue.match(RegExpPass)) {
    errors =
      "Tu contraseña debe tener una mayúscula, una minúscula y un número";
  }

  errorField.innerText = errors;
};

const avatarValidator = (field, errorField) => {
  let errors = "";
  avatarValue = field.value.trim();

  if (!filled(avatarValue)) {
    errors = "Debes subir una Imagen";
  } else if (!RegExpAvatar.exec(avatarValue)) {
    errors = "El formato admitido es .jpg, .jpeg, .gif o .png";
  }

  errorField.innerText = errors;
};

const securityValidator = (value, errors) => {
  if (RegExpWords.test(value)) {
    errors = "Contiene palabras Prohibidas";
  } else if (RegExpCaracter.test(value)) {
    errors = "Contiene carácteres prohibidos";
  }
  return errors;
};

const selectValidator = (value, errors) => {
  if (!value) {
    errors = "Debes seleccionar una opción";
  }
  return errors;
};
