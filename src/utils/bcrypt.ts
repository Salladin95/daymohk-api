import * as bcrypt from 'bcrypt';

export const encodePassword = async (password: string, salt: number) => {
  return bcrypt.hash(password, salt);
};

export const checkPassword = async (password: string, hash: string) => {
  return bcrypt.compare(password, hash);
};
