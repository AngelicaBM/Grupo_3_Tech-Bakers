window.addEventListener("load", function () {
    
    // capturamos el form de Login
  const form = document.querySelector("form.login");

  // capturamos los input elements
  const loginEmail = document.querySelector("#email");
  const loginPassword = document.querySelector("#password");
  const loginEmailError = document.getElementById("loginEmailError");
  const loginPasswordError = document.getElementById("loginPasswordError");

  /* Expresiones regulares */
  const RegExpEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i;

  let errors = [];

  // Funciones de Validacion

  const emailValidator = () => {
    let validationResult = checkIsRequired('email', loginEmail.value);

    if (validationResult.isValid && !RegExpEmail.test(loginEmail.value)) {
      validationResult.errorMessage = "El formato de email es invalido";
      validationResult.isValid = false;
    }

    if (!validationResult.isValid) {
      errors.push("email");
    } else {
      errors = errors.filter((value) => value !== "email");
    }

    loginEmailError.innerText = validationResult.errorMessage;
  };

  const passwordValidator = () => {
    let validationResult = checkIsRequired('password', loginPassword.value);


    if (!validationResult.isValid) {
      errors.push("password");
    } else {
      errors = errors.filter((value) => value !== "password");
    }

    loginPasswordError.innerText = validationResult.errorMessage;
  };

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    emailValidator();
    passwordValidator();

    if (errors.length) {
      event.preventDefault();
    } else {
      form.submit();
    }
  });

  loginEmail.addEventListener("blur", emailValidator);
  loginPassword.addEventListener("blur", passwordValidator);
  loginEmail.addEventListener("change", emailValidator);
  loginPassword.addEventListener("change", passwordValidator);
});
