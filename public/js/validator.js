// expresiones regulares

const RegExpEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i;
const RegExpPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,}$/i;
const RegExpAvatar = /(.jpg|.jpeg|.png|.gif)$/i;
const RegExpCaracter = /[$&+,:;=?#|'<>^*()%!]/;
const RegExpWords = /^(select)$|^(from)$/;

// validadores

let filled = (value) => value !== "";
let length = (value) => value.length > 1;
let productLength = (value) => value.length < 5;
let passLength = (value) => value.length >= 4;

// Formateador de errores para mostrar el texto en elemento
const buildErrorsText = (elem, errors) => {
	elem.innerHTML = errors.join("<br />");
};

const updateFieldsWithErrors = (errorsObject, fieldName, errors) => {
	if (errors.length) {
		errorsObject[fieldName] = true;
	} else {
		delete errorsObject[fieldName];
	}
};

// common functions

const emailValidator = (field, errorField, fieldsWithErrors) => {
	let errors = [];
	emailValue = field.value.trim();

	if (!filled(emailValue)) {
		errors.push("Debes ingresar un Email");
	} else if (!emailValue.match(RegExpEmail)) {
		errors.push("Debes ingresar un formato válido de Email");
	}

	securityValidator(emailValue, errors, fieldsWithErrors);
	buildErrorsText(errorField, errors);
	updateFieldsWithErrors(fieldsWithErrors, "email", errors);
};

const passwordValidator = (field, errorField, fieldsWithErrors) => {
	const errors = [];
	passwordValue = field.value.trim();

	if (!filled(passwordValue)) {
		errors.push("Debes ingresar un Password");
	} else if (!passLength(passwordValue)) {
		errors.push("Tu contraseña debe tener al menos 4 carácteres");
	} else if (!passwordValue.match(RegExpPass)) {
		errors.push(
			"Tu contraseña debe tener una mayúscula, una minúscula y un número"
		);
	}

	buildErrorsText(errorField, errors);
	updateFieldsWithErrors(fieldsWithErrors, "password", errors);
};

const avatarValidator = (field, errorField, fieldsWithErrors) => {
	const errors = [];
	avatarValue = field.value.trim();

	if (!filled(avatarValue)) {
		errors.push("Debes subir una Imagen");
	} else if (!RegExpAvatar.exec(avatarValue)) {
		errors.push("El formato admitido es .jpg, .jpeg, .gif o .png");
	} 

	buildErrorsText(errorField, errors);
	updateFieldsWithErrors(fieldsWithErrors, "avatar", errors);
};

const securityValidator = (value, errors, fieldsWithErrors) => {
	if (RegExpWords.test(value)) {
		errors.push("Contiene palabras Prohibidas");
	} else if (RegExpCaracter.test(value)) {
		errors.push("Contiene carácteres prohibidos");
	}
	updateFieldsWithErrors(fieldsWithErrors, "security", errors);
};

const selectValidator = (value, errors) => {
	if (!value) {
		errors.push("Debes seleccionar una opción");
	}
};


