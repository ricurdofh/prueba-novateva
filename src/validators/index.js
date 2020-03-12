const PATTERN_EMAIL = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const PATTERN_PASSWORD = /[a-z0-9]{6,}/;
const PATTERN_NAME = /[a-z ,.'-]+/;
const PATTERN_NUMBER = /^[0-9]+/;

export const EmailValidator = value => {
  return RegExpValidator(PATTERN_EMAIL, value);
}

export const PasswordValidator = value => {
  return RegExpValidator(PATTERN_PASSWORD, value);
}

export const NameValidator = value => {
  return RegExpValidator(PATTERN_NAME, value);
}

export const NumberValidator = value => {
  return RegExpValidator(PATTERN_NUMBER, value);
}

const RegExpValidator = (regexp, value) => {
  return regexp.test(value);
}