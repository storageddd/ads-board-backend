import * as bcrypt from 'bcrypt';

export const hashPassword = async (password): Promise<string> => {
  return await bcrypt.hash(password, 10);
};
