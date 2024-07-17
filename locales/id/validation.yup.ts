// @ts-ignore
import printValue from 'yup/lib/util/printValue';

export const mixed = {
  default: 'Kolom tidak valid',
  required: 'Kolom harus diisi',
  oneOf: 'Kolom harus salah satu dari: ${values}',
  notOneOf: 'Kolom tidak boleh salah satu dari: ${values}',
  notType: ({ path, type, value, originalValue }: any) => {
    const isCast = originalValue != null && originalValue !== value;

    // CASE: Validation of non-number input, value == NaN
    if (isCast && type === 'number' && isNaN(value)) {
      return 'Kolom harus merupakan angka';
    }

    // CASE: Non-nullable value ends up with null value (e.g: select)
    if (!isCast && type === 'string' && value === null) {
      return 'Kolom tidak boleh kosong';
    }

    let msg =
      `Kolom harus tipe \`${type}\`, ` +
      `tetapi nilai akhir berupa: \`${printValue(value, true)}\`` +
      (isCast ? ` (hasil dari \`${printValue(originalValue, true)}\`).` : '.');

    if (value === null) {
      msg +=
        '\n Jika "null" dimaksudkan sebagai nilai kosong pastikan untuk menandai skema sebagai `.nullable()`';
    }

    return msg;
  },
  defined: '${path} harus di ada',
};

export const string = {
  length: 'Kolom harus ${length} huruf',
  min: 'Kolom minimal ${min} huruf',
  max: 'Kolom maksimal ${max} huruf',
  matches: 'Kolom harus cocok dengan pola: "${regex}"',
  email: 'Kolom harus berisi email yang valid',
  url: 'Kolom harus berisi URL yang valid',
  trim: 'Kolom harus teks tanpa spasi di awalan dan akhiran',
  lowercase: 'Kolom harus teks huruf kecil',
  uppercase: 'Kolom harus teks huruf besar',
};

export const number = {
  min: 'Kolom minimal sama dengan ${min}',
  max: 'Kolom maksimal sama dengan ${max}',
  less: 'Kolom harus lebih kecil dari ${less}',
  more: 'Kolom harus lebih besar dari ${more}',
  notEqual: 'Kolom harus sama dengan ${notEqual}',
  positive: 'Kolom harus berupa angka positif',
  negative: 'Kolom harus berupa angka negatif',
  integer: 'Kolom harus berupa angka',
};

export const date = {
  min: 'Kolom harus setelah tanggal ${min}',
  max: 'Kolom harus sebelum tanggal ${max}',
};

export const boolean = {
  isValue: ({ value, originalValue }) => {
    if (value === 'true' && originalValue === false) {
      return 'Kolom harus dicentang';
    } else if (value === 'false' && originalValue === true) {
      return 'Kolom tidak boleh dicentang';
    }
  },
};

export const object = {
  noUnknown: 'Kolom harus valid sesuai skema',
};

export const array = {
  min: 'Kolom minimal harus memiliki ${min} item',
  max: 'Kolom maksimal harus memiliki ${max} item',
};

export default {
  mixed,
  string,
  number,
  date,
  object,
  array,
  boolean,
};
