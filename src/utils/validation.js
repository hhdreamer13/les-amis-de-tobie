export const required = (value) => {
  if (!value.trim()) {
    return "Ohé, ne m'oublie pas !";
  }

  return null; // no error
};

export const minLength = (min) => (value) => {
  if (value.length < min) {
    return `Continue, c'est un bon début.`;
  }

  return null; // no error
};

export const maxLength = (max) => (value) => {
  if (value.length > max) {
    return `Houla ! C'est un peu trop long.`;
  }

  return null; // no error
};

export const emailValidation = (value) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!re.test(value)) {
    return "Ton e-mail semble incomplet...";
  }

  return null; // no error
};

export const postalCodeValidation = (value) => {
  const re = /^[a-zA-Z0-9-\s]*$/;

  if (!re.test(value)) {
    return "Le code postal semble incorrect...";
  }

  return null; // no error
};

export const isTrue = (value) => {
  if (!value) {
    return "Un petit clic sur la case, peut-être ?";
  }
  return null;
};
