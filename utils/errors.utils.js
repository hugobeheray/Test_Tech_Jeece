function signUpErrors(err) {
  let errors = { pseudo: "", email: "", password: "" };

  if (err.message.includes("pseudo")) {
    errors.pseudo = "pseudo incorrect ou déja pris";
  }
  if (err.message.includes("email")) {
    errors.email = "email incorrect";
  }
  if (err.message.includes("password")) {
    errors.password = "password incorrect";
  }

  if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("pseudo")) {
    errors.pseudo = "Cet pseudo est déjà  enregistré";
  }
  if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("email")) {
    errors.email = "Cet email est déjà  enregistré";
  }

  return errors;
}

function signInErrors(err) {
  let errors = { email: "", password: "" };

  if (err.message.includes("email")) errors.email = "Email inconnu";

  if (err.message.includes("password"))
    errors.password = "Le mot de passe ne correspond pas";

  return errors;
}

function uploadErrors(err) {
  let errors = { format: "", maxSize: "" };
  if (err.message.includes("Invalid file"))
    errors.format = "format incompatible";

  if (err.message.includes("max size"))
    errors.maxSize = "Le fichier est trop volumineux";
  return errors;
}

export { uploadErrors };
export { signInErrors };
export { signUpErrors };
