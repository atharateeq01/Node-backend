import mongoose, { Schema, Document } from 'mongoose';
import * as validator from '@utils/helper/validationChecker';
import { MESSAGES } from '@utils/message';

export interface ICategory extends Document {
  categoryName: string;
  categoryDescription?: string;
  categoryImage?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const CategorySchema: Schema = new Schema({
  categoryName: { 
    type: String, 
    required: [true, `Category name${MESSAGES.IS_REQUIRED}`],
    validate: [validator.isAlphaNumericWithSpecial, `Category name${MESSAGES.INVALID_ENTRY}`]
  },
  categoryDescription: { 
    type: String,
    validate: [validator.isAlphaNumericWithSpecial, `Category description${MESSAGES.INVALID_ENTRY}`]
  },
  categoryImage: { 
    type: String,
  },
}, {
  timestamps: true
});

export default mongoose.model<ICategory>('Category', CategorySchema);
