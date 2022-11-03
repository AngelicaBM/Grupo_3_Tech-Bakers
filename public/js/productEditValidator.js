window.addEventListener("load", function () {
	// capturamos el form de Creacion de Producto

	const editForm = document.querySelector(".create_edit");

	// capturamos los input a validar
	const editName = document.querySelector("#name");
	const editType = document.querySelector(".editType");
	const editPrice = document.querySelector("#price");
	const editDiscount = document.querySelector("#discount");
	const editAvatar = document.querySelector("#image");
	const editDescription = document.querySelector("#description");
	const editStock = document.querySelector("#stock");
	const editCategory = document.querySelector('[name="category"]');

	// capturamos los divs de validacion
	const editNameError = document.querySelector("#editNameError");
	const editTypeError = document.querySelector("#editTypeError");
	const editPriceError = document.querySelector("#editPriceError");
	const editDiscountError = document.querySelector("#editDiscountError");
	const editAvatarError = document.querySelector("#editAvatarError");
	const editDescriptionError = document.querySelector("#editDescriptionError");
	const editStockError = document.querySelector("#editStockError");
	const editCategoryError = document.querySelector("#editCategoryError");

	// Funciones de Validacion consumidas desde productCreateValidator.js
	let fieldsWithErrors = {};
	const editNameValidator = () => {
		const errors = [];
		nameValue = editName.value.trim();

		if (!filled(nameValue)) {
			errors.push("Ingresa el Nombre del Producto");
		} else if (productLength(nameValue)) {
			errors.push("El nombre debe tener al menos 5 caracteres");
		}

		securityValidator(nameValue, errors, fieldsWithErrors);
		buildErrorsText(editNameError, errors);
		updateFieldsWithErrors(fieldsWithErrors, "editName", errors);
	};

	const editTypeValidator = () => {
		const errors = [];
		typeValue = editType.value;

		selectValidator(typeValue, errors, fieldsWithErrors);
		securityValidator(typeValue, errors, fieldsWithErrors);
		buildErrorsText(editTypeError, errors);
		updateFieldsWithErrors(fieldsWithErrors, "editType", errors);
	};

	const editPriceValidator = () => {
		const errors = [];
		priceValue = editPrice.value.trim();

		if (!filled(priceValue)) {
			errors.push("Ingresa el Precio del Producto");
		} else if (priceValue <= 0) {
			errors.push("El precio debe ser un número Positivo");
		}

		securityValidator(priceValue, errors, fieldsWithErrors);
		buildErrorsText(editPriceError, errors);
		updateFieldsWithErrors(fieldsWithErrors, "editPrice", errors);
	};

	const editDiscountValidator = () => {
		const errors = [];
		discountValue = editDiscount.value.trim();

		if (!filled(discountValue)) {
			errors.push("El producto tiene algun Descuento?");
		} else if (discountValue <= 0) {
			errors.push("El descuento debe ser un número Positivo");
		}

		securityValidator(discountValue, errors, fieldsWithErrors);
		buildErrorsText(editDiscountError, errors);
		updateFieldsWithErrors(fieldsWithErrors, "editDiscount", errors);
	};

	const editDescriptionValidator = () => {
		const errors = [];
		descriptionValue = editDescription.value.trim();

		if (!filled(descriptionValue)) {
			errors.push(
				"Ingresa la Descripción del Producto. Límite:  250 caracteres"
			);
		} else if (descriptionValue.length > 250) {
			errors.push("Superaste el límite de caracteres");
		}

		securityValidator(descriptionValue, errors, fieldsWithErrors);
		buildErrorsText(editDescriptionError, errors);
		updateFieldsWithErrors(fieldsWithErrors, "editDescription", errors);
	};


	const editStockValidator = () => {
		const errors = [];
		stockValue = editStock.value.trim();

		if (!filled(stockValue)) {
			errors.push("Debes setear el Stock de éste Producto");
		} else if (stockValue < 0) {
			errors.push("El stock debe ser un número Positivo");
		} else if (stockValue >= 30) {
			errors.push("Alerta, stocks más limitados garantizan frescura");
		}

		securityValidator(stockValue, errors, fieldsWithErrors);
		buildErrorsText(editStockError, errors);
		updateFieldsWithErrors(fieldsWithErrors, "editStock", errors);
	};

	const editCategoryValidator = () => {
		const errors = [];
		categoryValue = editCategory.value;

		selectValidator(categoryValue, errors, fieldsWithErrors);
		securityValidator(categoryValue, errors, fieldsWithErrors);
		buildErrorsText(editCategoryError, errors);
		updateFieldsWithErrors(fieldsWithErrors, "editCategory", errors);
	};

	// Hacemos el Prevent Default del Submit
	editForm.addEventListener("submit", function (event) {
		event.preventDefault();
		avatarValidator(editAvatar, editAvatarError, fieldsWithErrors);
		editNameValidator(editName, editNameError, fieldsWithErrors);
		editTypeValidator(editType, editTypeError, fieldsWithErrors);
		editPriceValidator(editPrice, editPriceError, fieldsWithErrors);
		editDiscountValidator(editDiscount, editDiscountError, fieldsWithErrors);
		editDescriptionValidator(
			editDescription,
			editDescriptionError,
			fieldsWithErrors
		);
		editStockValidator(editCategory, editCategoryError, fieldsWithErrors);
		editCategoryValidator(editCategory, editCategoryError, fieldsWithErrors);

		if (!Object.keys(fieldsWithErrors).length) {
			editForm.submit();
		}
	});

	// validamos formularios en tiempo real

	editAvatar.addEventListener("blur", (e) =>
		avatarValidator(editAvatar, editAvatarError, fieldsWithErrors)
	);
	editName.addEventListener("blur", editNameValidator, fieldsWithErrors);
	editType.addEventListener("blur", editTypeValidator, fieldsWithErrors);
	editPrice.addEventListener("blur", editPriceValidator, fieldsWithErrors);
	editDiscount.addEventListener("blur", editDiscountValidator, fieldsWithErrors);
	editDescription.addEventListener("blur", editDescriptionValidator, fieldsWithErrors);
	editStock.addEventListener("blur", editStockValidator, fieldsWithErrors);
	editCategory.addEventListener("blur", editCategoryValidator, fieldsWithErrors);

	// validamos formularios cuando se genere un cambio

	editAvatar.addEventListener("change", (e) =>
		avatarValidator(editAvatar, editAvatarError, fieldsWithErrors)
	);
	editName.addEventListener("change", editNameValidator, fieldsWithErrors);
	editType.addEventListener("change", editTypeValidator, fieldsWithErrors);
	editPrice.addEventListener("change", editPriceValidator, fieldsWithErrors);
	editDiscount.addEventListener("change", editDiscountValidator, fieldsWithErrors);
	editDescription.addEventListener("change", editDescriptionValidator, fieldsWithErrors);
	editStock.addEventListener("input", editStockValidator, fieldsWithErrors);
	editCategory.addEventListener("change", editCategoryValidator, fieldsWithErrors);
});
