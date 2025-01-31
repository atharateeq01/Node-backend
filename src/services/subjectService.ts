import Subject, { ISubject } from '@models/Subject';

export const createSubject = async (subjectData: ISubject): Promise<ISubject | null> => {
  const subject = new Subject(subjectData);
  await subject.save();
  return getSubjectById(subject.id);
};

export const getSubjects = async (): Promise<ISubject[]> => {
  return await Subject.find({}).exec();
};

export const getSubjectById = async (subjectId: string): Promise<ISubject | null> => {
  return await Subject.findById(subjectId).exec();
};

export const updateSubject = async (subjectId: string, subjectData: Partial<ISubject>): Promise<ISubject | null> => {
  return await Subject.findByIdAndUpdate(subjectId, subjectData, { new: true, runValidators: true }).exec();
};

export const deleteSubject = async (subjectId: string): Promise<void> => {
  await Subject.findByIdAndDelete(subjectId).exec();
};
