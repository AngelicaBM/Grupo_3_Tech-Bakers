window.addEventListener("load", function () {
  // capturamos el form de Register

  const registerForm = document.querySelector("form.inputs");

  // capturamos los input a validar

  const registerFullname = document.querySelector("#fullname");
  const registerLastname = document.querySelector("#lastname");
  const registerEmail = document.querySelector("#email");
  const registerPhone = document.querySelector("#phonenumber");
  const registerAdress = document.querySelector("#address");
  const registerCity = document.querySelector("#city");
  const registerPassword = document.querySelector("#password");
  const registerConfirmPassword = document.querySelector("#repetirpassword");
  const registerAvatar = document.querySelector("#avatar");
  const registerCheckbox = document.querySelector('input[type="checkbox"]');

  // capturamos los divs de validacion

  const registerFullnameError = document.querySelector(
    "#registerFullnameError"
  );
  const registerLastnameError = document.querySelector(
    "#registerLastnameError"
  );
  const registerEmailError = document.querySelector("#registerEmailError");
  const registerPhoneError = document.querySelector(
    "#registerPhoneNumberError"
  );
  const registerAdressError = document.querySelector("#registerAddressError");
  const registerCityError = document.querySelector("#registerCityError");
  const registerPasswordError = document.querySelector(
    "#registerPasswordError"
  );
  const registerConfirmPasswordError = document.querySelector(
    "#registerConfirmPasswordError"
  );
  const registerAvatarError = document.querySelector("#registerAvatarError");
  const registerCheckboxError = document.querySelector(
    "#registerCheckboxError"
  );

  // Expresiones regulares

  const RegExpPhone = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

  // Funciones de Validacion
  let fieldsWithErrors = {};

  const fullnameValidator = () => {
    const errors = [];
    fullnameValue = registerFullname.value.trim();

    if (!filled(fullnameValue)) {
      errors.push("Debes ingresar un Nombre");
    } else if (!length(fullnameValue)) {
      errors.push("Tu Nombre debe tener al menos 2 caracteres");
    }

    securityValidator(fullnameValue, errors, fieldsWithErrors);
    buildErrorsText(registerFullnameError, errors);
    updateFieldsWithErrors(fieldsWithErrors, 'fullName', errors);
  };

  const lastnameValidator = () => {
    const errors = [];

    lastnameValue = registerLastname.value.trim();

    if (!filled(lastnameValue)) {
      errors.push("Debes ingresar un Apellido");
    } else if (!length(lastnameValue)) {
      errors.push("Tu Apellido debe tener al menos 2 caracteres");
    }

    securityValidator(lastnameValue, errors, fieldsWithErrors);
    buildErrorsText(registerLastnameError, errors);
    updateFieldsWithErrors(fieldsWithErrors, 'lastName', errors);
  };

  const phoneValidator = () => {
    const errors = [];

    phoneValue = registerPhone.value.trim();

    if (!filled(phoneValue)) {
      errors.push("Debes ingresar un Teléfono");
    } else if (!passLength(phoneValue)) {
      errors.push("Debes ingresar un formato válido de Teléfono");
    }

    securityValidator(phoneValue, errors, fieldsWithErrors);
    buildErrorsText(registerPhoneError, errors);
    updateFieldsWithErrors(fieldsWithErrors, 'phone', errors);
  };

  const addressValidator = () => {
    const errors = [];

    addressValue = registerAdress.value.trim();

    if (!filled(addressValue)) {
      errors.push("Debes ingresar una Dirección");
    }

    securityValidator(addressValue, errors, fieldsWithErrors);
    buildErrorsText(registerAdressError, errors);
    updateFieldsWithErrors(fieldsWithErrors, 'address', errors);
  };

  const cityValidator = () => {
    const errors = [];

    cityValue = registerCity.value.trim();

    if (!filled(cityValue)) {
      errors.push("Debes ingresar tu Ciudad de residencia");
    }

    securityValidator(cityValue, errors, fieldsWithErrors);
    buildErrorsText(registerCityError, errors);
    updateFieldsWithErrors(fieldsWithErrors, 'city', errors);
  };

  const confirmPasswordValidator = () => {
    const errors = [];

    passwordValue = registerPassword.value.trim();
    passwordConfirmValue = registerConfirmPassword.value.trim();

    if (!filled(passwordConfirmValue)) {
      errors.push("Debes repetir tu Password");
    } else if (!passLength(passwordConfirmValue)) {
      errors.push("Tu contraseña debe tener al menos 4 carácteres");
    } else if (!passwordConfirmValue.match(RegExpPass)) {
      errors.push(
        "Tu contraseña debe tener una mayúscula, una minúscula y un número"
      );
    } else if (passwordValue !== passwordConfirmValue) {
      errors.push("Tus contraseñas no coinciden");
    }

    buildErrorsText(registerConfirmPasswordError, errors);
    updateFieldsWithErrors(fieldsWithErrors, 'password', errors);
  };

  const checkboxValidator = () => {
    const errors = [];

    checkboxValue = registerCheckbox.checked;

    if (!checkboxValue) {
      errors.push("Debes aceptar los Términos y Condiciones");
    }

    buildErrorsText(registerCheckboxError, errors);
    updateFieldsWithErrors(fieldsWithErrors, 'terms', errors);
  };

  // Hacemos el Prevent Default del Submit

  registerForm.addEventListener("submit", function (event) {
    event.preventDefault();

    emailValidator(registerEmail, registerEmailError, fieldsWithErrors);
    passwordValidator(registerPassword, registerPasswordError, fieldsWithErrors);
    avatarValidator(registerAvatar, registerAvatarError, fieldsWithErrors);
    fullnameValidator(registerFullname, registerFullnameError, fieldsWithErrors);
    lastnameValidator(registerLastname, registerLastnameError, fieldsWithErrors);
    phoneValidator(registerPhone, registerPhoneError, fieldsWithErrors);
    addressValidator(registerAdress, registerAdressError, fieldsWithErrors);
    cityValidator(registerCity, registerCityError, fieldsWithErrors);
    confirmPasswordValidator(
      registerConfirmPassword,
      registerConfirmPasswordError, fieldsWithErrors
    );
    checkboxValidator(registerCheckbox, registerCheckboxError, fieldsWithErrors);

    if(!Object.keys(fieldsWithErrors).length) {
      registerForm.submit();
    }
  });

  // validamos formularios en tiempo real

  registerEmail.addEventListener("blur", (e) =>
    emailValidator(registerEmail, registerEmailError, fieldsWithErrors)
  );
  registerPassword.addEventListener("blur", (e) =>
    passwordValidator(registerPassword, registerPasswordError, fieldsWithErrors)
  );
  registerAvatar.addEventListener("blur", (e) =>
    avatarValidator(registerAvatar, registerAvatarError, fieldsWithErrors)
  );
  registerFullname.addEventListener("blur", fullnameValidator, fieldsWithErrors);
  registerLastname.addEventListener("blur", lastnameValidator, fieldsWithErrors);
  registerPhone.addEventListener("blur", phoneValidator, fieldsWithErrors);
  registerAdress.addEventListener("blur", addressValidator, fieldsWithErrors);
  registerCity.addEventListener("blur", cityValidator, fieldsWithErrors);
  registerConfirmPassword.addEventListener("blur", confirmPasswordValidator, fieldsWithErrors);

  // validamos formularios cuando se genere un cambio

  registerEmail.addEventListener("change", (e) =>
    emailValidator(registerEmail, registerEmailError, fieldsWithErrors)
  );
  registerPassword.addEventListener("change", (e) =>
    passwordValidator(registerPassword, registerPasswordError, fieldsWithErrors)
  );
  registerAvatar.addEventListener("change", (e) =>
    avatarValidator(registerAvatar, registerAvatarError, fieldsWithErrors)
  );
  registerFullname.addEventListener("change", fullnameValidator, fieldsWithErrors);
  registerLastname.addEventListener("change", lastnameValidator, fieldsWithErrors);
  registerPhone.addEventListener("change", phoneValidator, fieldsWithErrors);
  registerAdress.addEventListener("change", addressValidator, fieldsWithErrors);
  registerCity.addEventListener("change", cityValidator, fieldsWithErrors);
  registerConfirmPassword.addEventListener("change", confirmPasswordValidator, fieldsWithErrors);
  registerCheckbox.addEventListener("change", checkboxValidator, fieldsWithErrors);
});
