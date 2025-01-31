import mongoose, { Schema, Document } from 'mongoose';

import * as validator from '@utils/helper/validationChecker';
import { hashingPassword } from '@utils/helper/hash';
import { MESSAGES } from '@utils/message';

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  role: 'buyer' | 'seller'; 
}

const UserSchema: Schema = new Schema({
  firstName: { 
    type: String, 
    required: [true, `First name${MESSAGES.IS_REQUIRED}`],
    validate: [validator.isAlphabetic, `First name${MESSAGES.ONLY_ALPHABETIC}`]
  },
  lastName: { 
    type: String, 
    required: [true, `Last name${MESSAGES.IS_REQUIRED}`],
    validate: [validator.isAlphabetic, `Last name${MESSAGES.ONLY_ALPHABETIC}`]
  },
  userName: { 
    type: String, 
    required: [true, `User name${MESSAGES.IS_REQUIRED}`],
    validate: [validator.isAlphaNumeric, `User name${MESSAGES.ONLY_ALPHANUMERIC}`] 
  },
  email: { 
    type: String, 
    required: [true, `Email${MESSAGES.IS_REQUIRED}`], 
    unique: true,
    validate: [ validator.isValidEmail, MESSAGES.EMAIL_FORMAT_INVALID ]
  },
  password: { 
    type: String, 
    required: [true, `Password${MESSAGES.IS_REQUIRED}`], 
    validate: [validator.isStrongPassword, MESSAGES.PASSWORD_COMPLEXITY]
  },
  role: { 
    type: String, 
    required: [true, `Role${MESSAGES.IS_REQUIRED}`], 
    enum: ['buyer', 'seller'],  // Only allows "buyer" or "seller"
    message: `Role must be one of 'buyer' or 'seller'`
  }
});

// Hash password before saving
UserSchema.pre<IUser>('save', async function(next) {
  const user = this;
  if (!user.isModified('password')) return next();
  try {
    const hashedPassword = await hashingPassword(user.password)
    user.password = hashedPassword;
    return next();
  } catch (error) {
    return next();
  }
});

export default mongoose.model<IUser>('User', UserSchema);
