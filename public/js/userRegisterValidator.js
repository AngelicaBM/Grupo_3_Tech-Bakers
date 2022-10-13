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

  const fullnameValidator = () => {
    let errors = "";
    fullnameValue = registerFullname.value.trim();

    if (!filled(fullnameValue)) {
      errors = "Debes ingresar un Nombre";
    } else if (length(fullnameValue)) {
      errors = "Tu Nombre debe tener al menos 2 caracteres";
    }

    errors = securityValidator(fullnameValue, errors);

    registerFullnameError.innerText = errors;
  };

  const lastnameValidator = () => {
    let errors = "";
    lastnameValue = registerLastname.value.trim();

    if (!filled(lastnameValue)) {
      errors = "Debes ingresar un Apellido";
    } else if (length(lastnameValue)) {
      errors = "Tu Apellido debe tener al menos 2 caracteres";
    }

    errors = securityValidator(lastnameValue, errors);

    registerLastnameError.innerText = errors;
  };

  const phoneValidator = () => {
    let errors = "";
    phoneValue = registerPhone.value.trim();

    if (!filled(phoneValue)) {
      errors = "Debes ingresar un Teléfono";
    } else if (!phoneValue.match(RegExpPhone)) {
      errors = "Debes ingresar un formato válido de Teléfono";
    }

    errors = securityValidator(phoneValue, errors);

    registerPhoneError.innerText = errors;
  };

  const addressValidator = () => {
    let errors = "";
    addressValue = registerAdress.value.trim();

    if (!filled(addressValue)) {
      errors = "Debes ingresar una Dirección";
    }

    errors = securityValidator(addressValue, errors);

    registerAdressError.innerText = errors;
  };

  const cityValidator = () => {
    let errors = "";
    cityValue = registerCity.value.trim();

    if (!filled(cityValue)) {
      errors = "Debes ingresar tu Ciudad de residencia";
    }

    errors = securityValidator(cityValue, errors);

    registerCityError.innerText = errors;
  };

  const confirmPasswordValidator = () => {
    let errors = "";
    passwordValue = registerPassword.value.trim();
    passwordConfirmValue = registerConfirmPassword.value.trim();

    if (!filled(passwordConfirmValue)) {
      errors = "Debes repetir tu Password";
    } else if (!passLength(passwordConfirmValue)) {
      errors = "Tu contraseña debe tener al menos 8 carácteres";
    } else if (!passwordConfirmValue.match(RegExpPass)) {
      errors =
        "Tu contraseña debe tener una mayúscula, una minúscula y un número";
    } else if (passwordValue !== passwordConfirmValue) {
      errors = "Tus Password no coinciden";
      registerPasswordError.innerText = errors;
    }

    registerConfirmPasswordError.innerText = errors;
  };

  const checkboxValidator = () => {
    let errors = "";
    checkboxValue = registerCheckbox.checked;

    if (!checkboxValue) {
      errors = "Debes aceptar los Términos y Condiciones";
    }

    registerCheckboxError.innerText = errors;
  };

  // Hacemos el Prevent Default del Submit

  registerForm.addEventListener("submit", function (event) {
    event.preventDefault();
    emailValidator(registerEmail, registerEmailError);
    passwordValidator(registerPassword, registerPasswordError);
    avatarValidator(registerAvatar, registerAvatarError);
    fullnameValidator(registerFullname, registerFullnameError);
    lastnameValidator(registerLastname, registerLastnameError);
    phoneValidator(registerPhone, registerPhoneError);
    addressValidator(registerAdress, registerAdressError);
    cityValidator(registerCityError, registerCityErrorError);
    confirmPasswordValidator(registerConfirmPassword, registerConfirmPasswordError);
    checkboxValidator(registerCheckboxError, registerCheckboxErrorError);

    if (errors.length) {
      event.preventDefault();
    } else {
      registerForm.submit();
    }
  });

  // validamos formularios en tiempo real

  registerEmail.addEventListener("blur", (e) =>
    emailValidator(registerEmail, registerEmailError)
  );
  registerPassword.addEventListener("blur", (e) =>
    passwordValidator(registerPassword, registerPasswordError)
  );
  registerAvatar.addEventListener("blur", (e) =>
    avatarValidator(registerAvatar, registerAvatarError)
  );
  registerFullname.addEventListener("blur", fullnameValidator);
  registerLastname.addEventListener("blur", lastnameValidator);
  registerPhone.addEventListener("blur", phoneValidator);
  registerAdress.addEventListener("blur", addressValidator);
  registerCity.addEventListener("blur", cityValidator);
  registerConfirmPassword.addEventListener("blur", confirmPasswordValidator);

  // validamos formularios cuando se genere un cambio

  registerEmail.addEventListener("change", (e) =>
    emailValidator(registerEmail, registerEmailError)
  );
  registerPassword.addEventListener("change", (e) =>
    passwordValidator(registerPassword, registerPasswordError)
  );
  registerAvatar.addEventListener("change", (e) =>
    avatarValidator(registerAvatar, registerAvatarError)
  );
  registerFullname.addEventListener("change", fullnameValidator);
  registerLastname.addEventListener("change", lastnameValidator);
  registerPhone.addEventListener("change", phoneValidator);
  registerAdress.addEventListener("change", addressValidator);
  registerCity.addEventListener("change", cityValidator);
  registerConfirmPassword.addEventListener("change", confirmPasswordValidator);
  registerCheckbox.addEventListener("change", checkboxValidator);
});
