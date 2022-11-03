window.addEventListener("load", function () {
	// capturamos el form de Creacion de Producto

	const createForm = document.querySelector(".create_edit");

	// Capturamos los input a validar

	const productName = document.querySelector("#name");
	const productType = document.querySelector(".type");
	const productPrice = document.querySelector("#price");
	const productDiscount = document.querySelector("#discount");
	const productImage = document.querySelector("#image");
	const productDescription = document.querySelector("#description");
	const productStock = document.querySelector("#stock");
	const productCategory = document.querySelector(".category");

	// Capturamos los divs de validacion

	const productNameError = document.querySelector("#createNameError");
	const productTypeError = document.querySelector("#createTypeError");
	const productPriceError = document.querySelector("#createPriceError");
	const productDiscountError = document.querySelector("#createDiscountError");
	const productImageError = document.querySelector("#createImageError");
	const productDescriptionError = document.querySelector(
		"#createDescriptionError"
	);
	const productStockError = document.querySelector("#createStockError");
	const productCategoryError = document.querySelector("#createCategoryError");

	// Funciones de Validacion
	let fieldsWithErrors = {};
	const productNameValidator = () => {
		const errors = [];
		nameValue = productName.value.trim();

		if (!filled(nameValue)) {
			errors.push("Ingresa el Nombre del Producto");
		} else if (productLength(nameValue)) {
			errors.push("El nombre debe tener al menos 5 caracteres");
		}

		securityValidator(nameValue, errors, fieldsWithErrors);
		buildErrorsText(productNameError, errors);
		updateFieldsWithErrors(fieldsWithErrors, "productName", errors);
	};

	const productTypeValidator = () => {
		const errors = [];
		typeValue = productType.value;

		selectValidator(typeValue, errors, fieldsWithErrors);
		securityValidator(typeValue, errors, fieldsWithErrors);
		buildErrorsText(productTypeError, errors);
		updateFieldsWithErrors(fieldsWithErrors, "type", errors);
	};

	const productPriceValidator = () => {
		const errors = [];
		priceValue = productPrice.value.trim();

		if (!filled(priceValue)) {
			errors.push("Ingresa el Precio del Producto");
		} else if (priceValue <= 0) {
			errors.push("El precio debe ser un número Positivo");
		}

		securityValidator(priceValue, errors, fieldsWithErrors);
		buildErrorsText(productPriceError, errors);
		updateFieldsWithErrors(fieldsWithErrors, "price", errors);
	};

	const productDiscountValidator = () => {
		const errors = [];
		discountValue = productDiscount.value.trim();

		if (!filled(discountValue)) {
			errors.push("El producto tiene algun descuento?");
		} else if (discountValue <= 0) {
			errors.push("El descuento debe ser un número Positivo");
		}

		securityValidator(discountValue, errors, fieldsWithErrors);
		buildErrorsText(productDiscountError, errors);
		updateFieldsWithErrors(fieldsWithErrors, "discount", errors);
	};

	const productDescriptionValidator = () => {
		const errors = [];
		descriptionValue = productDescription.value.trim();

		if (!filled(descriptionValue)) {
			errors.push(
				"Ingresa la Descripción del Producto. Límite:  250 caracteres"
			);
		} else if (descriptionValue.length > 250) {
			errors.push("Superaste el límite de caracteres");
		}

		securityValidator(descriptionValue, errors, fieldsWithErrors);
		buildErrorsText(productDescriptionError, errors);
		updateFieldsWithErrors(fieldsWithErrors, "description", errors);
	};

	const productStockValidator = () => {
		const errors = [];
		stockValue = productStock.value.trim();

		if (!filled(stockValue)) {
			errors.push("Debes setear el Stock de éste Producto");
		} else if (stockValue <= 0) {
			errors.push("El stock debe ser un número Positivo");
		} else if (stockValue >= 30) {
			errors.push("Alerta, stocks más limitados garantizan frescura");
		}

		securityValidator(stockValue, errors, fieldsWithErrors);
		buildErrorsText(productStockError, errors);
		updateFieldsWithErrors(fieldsWithErrors, "stock", errors);
	};

	const productCategoryValidator = () => {
		const errors = [];
		categoryValue = productCategory.value;

		selectValidator(categoryValue, errors, fieldsWithErrors);
		securityValidator(categoryValue, errors, fieldsWithErrors);
		buildErrorsText(productCategoryError, errors);
		updateFieldsWithErrors(fieldsWithErrors, "category", errors);
	};

	// Hacemos el Prevent Default del Submit

	createForm.addEventListener("submit", function (event) {
		event.preventDefault();
		avatarValidator(productImage, productImageError, fieldsWithErrors);
		productNameValidator(productName, productNameError, fieldsWithErrors);
		productTypeValidator(productType, productTypeError, fieldsWithErrors);
		productPriceValidator(productPrice, productPriceError, fieldsWithErrors);
		productDiscountValidator(
			productDiscount,
			productDiscountError,
			fieldsWithErrors
		);
		productDescriptionValidator(
			productDescription,
			productDescriptionError,
			fieldsWithErrors
		);
		productStockValidator(productStock, productStockError, fieldsWithErrors);
		productCategoryValidator(
			productCategory,
			productCategoryError,
			fieldsWithErrors
		);

		if (!Object.keys(fieldsWithErrors).length) {
			createForm.submit();
		}
	});

	// validamos formularios en tiempo real

	productImage.addEventListener("blur", (e) =>
		avatarValidator(productImage, productImageError, fieldsWithErrors)
	);
	productName.addEventListener("blur", productNameValidator, fieldsWithErrors);
	productType.addEventListener("blur", productTypeValidator, fieldsWithErrors);
	productPrice.addEventListener("blur", productPriceValidator, fieldsWithErrors);
	productDiscount.addEventListener("blur", productDiscountValidator, fieldsWithErrors);
	productDescription.addEventListener("blur", productDescriptionValidator, fieldsWithErrors);
	productStock.addEventListener("blur", productStockValidator, fieldsWithErrors);
	productCategory.addEventListener("blur", productCategoryValidator, fieldsWithErrors);

	// validamos formularios cuando se genere un cambio

	productImage.addEventListener("change", (e) =>
		avatarValidator(productImage, productImageError, fieldsWithErrors)
	);
	productName.addEventListener("change", productNameValidator, fieldsWithErrors);
	productType.addEventListener("change", productTypeValidator, fieldsWithErrors);
	productPrice.addEventListener("change", productPriceValidator, fieldsWithErrors);
	productDiscount.addEventListener("change", productDiscountValidator, fieldsWithErrors);
	productDescription.addEventListener("change", productDescriptionValidator, fieldsWithErrors);
	productStock.addEventListener("input", productStockValidator, fieldsWithErrors);
	productCategory.addEventListener("change", productCategoryValidator, fieldsWithErrors);
});
