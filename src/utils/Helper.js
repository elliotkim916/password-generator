let characters = '';
let passwordLength = 0;

const setUpperCase = isUpperCase => {
  if (isUpperCase) {
    characters += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  }

  return '';
};

const isLowerCase = isLowerCase => {
  if (isLowerCase) {
    characters += 'abcdefghijklmnopqrstuvwxyz';
  }

  return '';
};

const setSymbols = isSymbol => {
  if (isSymbol) {
    characters += '!@#$%^&*()<>,.?/[]{}-=_+|/';
  }

  return '';
};

const setNumber = isNumeric => {
  if (isNumeric) {
    characters += '0123456789';
  }

  return '';
};

// if parameters arent set, empty string is returned

// method that returns a random integer
// this integer selects a random character from the characters variable
// the number of characters chosen depends on the length of the password
const getRandomInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const passwordCharacters = () => {
  let password = '';
  if (characters.length > 0) {
    for (let i = 0; i < passwordLength; i++) {
      password += characters[getRandomInteger(0, characters.length - 1)];
    }

    // at the end of the loop, characters and passwordLength is reset
    characters = '';
    passwordLength = 0;
    return password;
  }
};

export const setPasswordLength = length => {
  passwordLength = length;
  return passwordLength;
}

export const generatePassword = (passwordProps, pwdLength) => {
  const { uppercase, lowercase, symbols, numbers } = passwordProps; // booleans

  setPasswordLength(pwdLength);
  setUpperCase(uppercase);
  setLowerCase(lowercase);
  setSymbols(symbols);
  setNumber(numbers);

  const password = passwordCharacters();
  return password;
}
