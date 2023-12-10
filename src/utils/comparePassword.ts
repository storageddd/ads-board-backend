import * as bcrypt from 'bcrypt';

export const comparePassword = async (password, hash): Promise<boolean> => {
  return await bcrypt.compare(password, hash);
};
