window.addEventListener("load", function () {
  // capturamos el form de Register

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

  const editNameValidator = () => {
    let errors = "";
    nameValue = editName.value.trim();

    if (!filled(nameValue)) {
      errors = "Ingresa el Nombre del Producto";
    } else if (productLength(nameValue)) {
      errors = "El nombre debe tener al menos 5 caracteres";
    }

    errors = securityValidator(nameValue, errors);
    editNameError.innerText = errors;
  };

  const editTypeValidator = () => {
    let errors = "";
    typeValue = editType.value;

    errors = selectValidator(typeValue, errors);
    errors = securityValidator(typeValue, errors);
    editTypeError.innerText = errors;
  };

  const editPriceValidator = () => {
    let errors = "";
    priceValue = editPrice.value.trim();

    if (!filled(priceValue)) {
      errors = "Ingresa el Precio del Producto";
    } else if (priceValue < 0) {
      errors = "El precio debe ser un número Positivo";
    }

    errors = securityValidator(priceValue, errors);
    editPriceError.innerText = errors;
  };

  const editDiscountValidator = () => {
    let errors = "";
    discountValue = editDiscount.value.trim();

    if (!filled(discountValue)) {
      errors = "El producto tiene algun Descuento?";
    }

    errors = securityValidator(discountValue, errors);
    editDiscountError.innerText = errors;
  };

  const editDescriptionValidator = () => {
    let errors = "";
    descriptionValue = editDescription.value.trim();

    if (!filled(descriptionValue)) {
      errors = "Ingresa la Descripción del Producto. Límite:  250 caracteres";
    } else if (descriptionValue.length > 250) {
      errors = "Superaste el límite de caracteres";
    }

    errors = securityValidator(descriptionValue, errors);
    editDescriptionError.innerText = errors;
  };

  const editStockValidator = () => {
    let errors = "";
    stockValue = editStock.value.trim();

    if (!filled(stockValue)) {
      errors = "Debes setear el Stock de éste Producto";
    } else if (stockValue < 0) {
      errors = "El stock debe ser un número Positivo";
    } else if (stockValue >= 30) {
      errors = "Alerta, stocks más limitados garantizan frescura";
    }

    errors = securityValidator(stockValue, errors);
    editStockError.innerText = errors;
  };

  const editCategoryValidator = () => {
    let errors = "";
    categoryValue = editCategory.value;

    errors = selectValidator(typeValue, errors);
    errors = securityValidator(categoryValue, errors);

    editCategoryError.innerText = errors;
  };

  // Hacemos el Prevent Default del Submit
  editForm.addEventListener("submit", function (event) {
    event.preventDefault();
    avatarValidator(editAvatar, editAvatarError);
    editNameValidator();
    editTypeValidator();
    editPriceValidator();
    editDiscountValidator();
    editDescriptionValidator();
    editStockValidator();
    editCategoryValidator();

    if (errors.length) {
      event.preventDefault();
    } else {
      registerForm.submit();
    }
  });

  // validamos formularios en tiempo real

  editAvatar.addEventListener("blur", (e) =>
    avatarValidator(editAvatar, editAvatarError)
  );
  editName.addEventListener("blur", editNameValidator);
  editType.addEventListener("blur", editTypeValidator);
  editPrice.addEventListener("blur", editPriceValidator);
  editDiscount.addEventListener("blur", editDiscountValidator);
  editDescription.addEventListener("blur", editDescriptionValidator);
  editStock.addEventListener("blur", editStockValidator);
  editCategory.addEventListener("blur", editCategoryValidator);

  // validamos formularios cuando se genere un cambio

  editAvatar.addEventListener("change", (e) =>
    avatarValidator(editAvatar, editAvatarError)
  );
  editName.addEventListener("change", editNameValidator);
  editType.addEventListener("change", editTypeValidator);
  editPrice.addEventListener("change", editPriceValidator);
  editDiscount.addEventListener("change", editDiscountValidator);
  editDescription.addEventListener("change", editDescriptionValidator);
  editStock.addEventListener("input", editStockValidator);
  editCategory.addEventListener("change", editCategoryValidator);
});
