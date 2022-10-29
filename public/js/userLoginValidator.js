window.addEventListener("load", function () {
	// capturamos el form de Login

	const loginForm = document.querySelector("form.login");

	// capturamos los input a validar

	const loginEmail = document.querySelector("#email");
	const loginPassword = document.querySelector("#password");

	// capturamos los div de validacion

	const loginEmailError = document.getElementById("loginEmailError");
	const loginPasswordError = document.getElementById("loginPasswordError");

	// Funciones de Validacion son consumidas desde validator.js

	// Hacemos el Prevent Default del Submit

	let fieldsWithErrors = {};
	loginForm.addEventListener("submit", function (event) {
		event.preventDefault();
		emailValidator(loginEmail, loginEmailError, fieldsWithErrors);
		passwordValidator(loginPassword, loginPasswordError, fieldsWithErrors);

		if (!Object.keys(fieldsWithErrors).length) {
			loginForm.submit();
		}
	});

	// validamos formularios en tiempo real

	loginEmail.addEventListener("blur", (e) =>
		emailValidator(loginEmail, loginEmailError, fieldsWithErrors)
	);
	loginPassword.addEventListener("blur", (e) =>
		passwordValidator(loginPassword, loginPasswordError, fieldsWithErrors)
	);

	// validamos formularios cuando se genere un cambio

	loginEmail.addEventListener("change", (e) =>
		emailValidator(loginEmail, loginEmailError, fieldsWithErrors)
	);
	loginPassword.addEventListener("change", (e) =>
		passwordValidator(loginPassword, loginPasswordError, fieldsWithErrors)
	);
});
