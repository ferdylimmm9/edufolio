import * as bcrypt from 'bcrypt';

export async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

export async function comparePassword(password, encrypted) {
  return await bcrypt.compare(password, encrypted);
}

const a = await hashPassword('superadmin');
console.log(a);
console.log(
  `https://jhzwvvmnkqgkpxroaqin.supabase.co/storage/v1/object/public/repository/photo-profile/superadmin.png`,
);
