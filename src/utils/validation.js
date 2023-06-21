export const required = (value) => {
  if (!value.trim()) {
    return "Eh bien, ce champ semble un peu seul.";
  }

  return null; // no error
};

export const minLength = (min) => (value) => {
  if (value.length < min) {
    return `Allez, tu peux faire mieux!`;
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
    return "Hmm, cet e-mail semble un peu étrange.";
  }

  return null; // no error
};

export const number = (value) => {
  if (isNaN(value)) {
    return "Hé, c'est un peu bizarre. On cherche un chiffre.";
  }
  return null;
};

export const isTrue = (value) => {
  if (!value) {
    return "Oh, as-tu oublié de cocher cette case ?";
  }
  return null;
};
