window.addEventListener("load", function () {
  // capturamos el form de Login

  const loginForm = document.querySelector("form.login");

  // capturamos los input a validar

  const loginEmail = document.querySelector("#email");
  const loginPassword = document.querySelector("#password");

  // capturamos los div de validacion

  const loginEmailError = document.getElementById("loginEmailError");
  const loginPasswordError = document.getElementById("loginPasswordError");

  let errors = [];

  // Funciones de Validacion son consumidas desde validator.js

  // Hacemos el Prevent Default del Submit

  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();
    emailValidator(loginEmail, loginEmailError);
    passwordValidator(loginPassword, loginPasswordError);

    if (errors.length) {
      event.preventDefault();
    } else {
      loginForm.submit();
    }
  });

  // validamos formularios en tiempo real

  loginEmail.addEventListener("blur", (e) =>
    emailValidator(loginEmail, loginEmailError)
  );
  loginPassword.addEventListener("blur", (e) =>
    passwordValidator(loginPassword, loginPasswordError)
  );

  // validamos formularios cuando se genere un cambio
  
  loginEmail.addEventListener("change", (e) =>
    emailValidator(loginEmail, loginEmailError)
  );
  loginPassword.addEventListener("change", (e) =>
    passwordValidator(loginPassword, loginPasswordError)
  );
});
