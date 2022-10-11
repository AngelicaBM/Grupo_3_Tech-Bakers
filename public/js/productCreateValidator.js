window.addEventListener("load", function () {
  // Capturamos el form de Create Product

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

  const productNameValidator = () => {
    let errors = "";
    nameValue = productName.value.trim();

    if (!filled(nameValue)) {
      errors = "Ingresa el Nombre del Producto";
    } else if (productLength(nameValue)) {
      errors = "El nombre debe tener al menos 5 caracteres";
    }

    errors = securityValidator(nameValue, errors);
    productNameError.innerText = errors;
  };

  const productTypeValidator = () => {
    let errors = "";
    typeValue = productType.value;

    errors = selectValidator(typeValue, errors);
    errors = securityValidator(typeValue, errors);
    productTypeError.innerText = errors;
  };

  const productPriceValidator = () => {
    let errors = "";
    priceValue = productPrice.value.trim();

    if (!filled(priceValue)) {
      errors = "Ingresa el Precio del Producto";
    } else if (priceValue < 0) {
      errors = "El precio debe ser un número Positivo";
    }

    errors = securityValidator(priceValue, errors);
    productPriceError.innerText = errors;
  };

  const productDiscountValidator = () => {
    let errors = "";
    discountValue = productDiscount.value.trim();

    if (!filled(discountValue)) {
      errors = "El producto tiene algun Descuento?";
    }

    errors = securityValidator(discountValue, errors);
    productDiscountError.innerText = errors;
  };

  const productDescriptionValidator = () => {
    let errors = "";
    descriptionValue = productDescription.value.trim();

    if (!filled(descriptionValue)) {
      errors = "Ingresa la Descripción del Producto. Límite:  250 caracteres";
    } else if (descriptionValue.length > 250) {
      errors = "Superaste el límite de caracteres";
    }

    errors = securityValidator(descriptionValue, errors);
    productDescriptionError.innerText = errors;
  };

  const productStockValidator = () => {
    let errors = "";
    stockValue = productStock.value.trim();

    if (!filled(stockValue)) {
      errors = "Debes setear el Stock de éste Producto";
    } else if (stockValue < 0) {
      errors = "El stock debe ser un número Positivo";
    } else if (stockValue >= 30) {
      errors = "Alerta, stocks más limitados garantizan frescura";
    }

    errors = securityValidator(stockValue, errors);
    productStockError.innerText = errors;
  };

  const productCategoryValidator = () => {
    let errors = "";
    categoryValue = productCategory.value;

    errors = selectValidator(typeValue, errors);
    errors = securityValidator(categoryValue, errors);

    productCategoryError.innerText = errors;
  };

  // Hacemos el Prevent Default del Submit

  createForm.addEventListener("submit", function (event) {
    event.preventDefault();
    avatarValidator(productImage, productImageError);
    productNameValidator();
    productTypeValidator();
    productPriceValidator();
    productDiscountValidator();
    productDescriptionValidator();
    productStockValidator();
    productCategoryValidator();

    if (errors.length) {
      event.preventDefault();
    } else {
      registerForm.submit();
    }
  });

  // validamos formularios en tiempo real

  productImage.addEventListener("blur", (e) =>
    avatarValidator(productImage, productImageError)
  );
  productName.addEventListener("blur", productNameValidator);
  productType.addEventListener("blur", productTypeValidator);
  productPrice.addEventListener("blur", productPriceValidator);
  productDiscount.addEventListener("blur", productDiscountValidator);
  productDescription.addEventListener("blur", productDescriptionValidator);
  productStock.addEventListener("blur", productStockValidator);
  productCategory.addEventListener("blur", productCategoryValidator);

  // validamos formularios cuando se genere un cambio

  productImage.addEventListener("change", (e) =>
    avatarValidator(productImage, productImageError)
  );
  productName.addEventListener("change", productNameValidator);
  productType.addEventListener("change", productTypeValidator);
  productPrice.addEventListener("change", productPriceValidator);
  productDiscount.addEventListener("change", productDiscountValidator);
  productDescription.addEventListener("change", productDescriptionValidator);
  productStock.addEventListener("input", productStockValidator);
  productCategory.addEventListener("change", productCategoryValidator);
});
