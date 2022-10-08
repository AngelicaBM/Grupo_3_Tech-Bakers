const checkIsRequired = (fieldName, value) => {
  let isValid = true;
  let errorMessage = "";
  if (value.trim() === "") {
    isValid = false;
    switch (fieldName) {
      case "email":
        errorMessage = "debes ingresar un mail";
        break;
      case "password":
        errorMessage = "debes ingresar una contrasenia";
        break;
      default:
        return;
    }
  }
  return { isValid, errorMessage };
};
