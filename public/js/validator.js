
  // validadores
  let filled = (value) => value !== "";
  let length = (value) => value.length < 2;
  let passLength = (value) => value.length >= 8;

   // expresiones regulares
   const RegExpEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i;
   const RegExpPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/i;

  // common functions
  const emailValidator = (field, errorField) => {
    let errors = "";
    emailValue = field.value.trim();

    if (!filled(emailValue)) {
      errors = "Debes ingresar un Email";
    } else if (!emailValue.match(RegExpEmail)) {
      errors = "Debes ingresar un formato válido de Email";
    }

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