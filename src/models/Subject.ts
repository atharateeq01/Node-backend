import mongoose, { Schema, Document } from 'mongoose';

import * as validator from '@utils/helper/validationChecker';
import { MESSAGES } from '@utils/message';

export interface ISubject extends Document {
  subjectName: string;
  subjectDescription?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const SubjectSchema: Schema = new Schema({
  subjectName: { 
    type: String, 
    required: [true, `Subject name${MESSAGES.IS_REQUIRED}`],
    validate: [validator.isAlphabetic, `Subject name${MESSAGES.ONLY_ALPHABETIC}`]
  },
  subjectDescription: { 
    type: String,
    validate: [validator.isAlphaNumericWithSpecial, `Subject description${MESSAGES.INVALID_ENTRY}`]
  },
}, {
  timestamps: true
});

export default mongoose.model<ISubject>('Subject', SubjectSchema);
