import bcrypt from 'bcryptjs';

export const hashingPassword  = async (password: string): Promise<string> => {    
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  };
