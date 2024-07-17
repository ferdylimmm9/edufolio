const regex = {
  phone: /^\+[1-9]\d{1,14}$/,
  uuid: /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi,
  password: /^(?=.*\d)(?=\S{8,})\S*$/,
  minLength8: /^.{8,}$/,
  atLeastOneNumber: /^(?=.*\d)/,
  noSpace: /^\S*$/,
  atLeastOneSymbolOrNumber: /^(?=.*[\d!@#$%^&*()_+{}\[\]:;<>,.?~\\/-])[^\s]*$/,
  symbolnumber: /[$&+,:;=?@#|'<>.^*()%!-0-9]/,
  space: /\s/,
};

export default regex;
