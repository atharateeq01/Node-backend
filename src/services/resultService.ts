import Result, { IResult } from '@models/Result';
import { IUser } from '@models/User';

export const createResult = async (resultData: IResult): Promise<IResult | null> => {
  const result = new Result(resultData);
  await result.save();
  return getResultById(result.id);
};

export const getResultById = async (resultId: string): Promise<IResult | null> => {
  return await Result.findById(resultId)
    .populate('subjectId', 'subjectName')
    .exec();
};

export const updateResult = async (resultId: string, resultData: Partial<IResult>): Promise<IResult | null> => {  
  await Result.findByIdAndUpdate(resultId, resultData, { new: true, runValidators: true }).exec();
  return getResultById(resultId);
};

export const deleteResult = async (resultId: string): Promise<void> => {
  await Result.findByIdAndDelete(resultId).exec();
};

export const getResults = async (userId: IUser['_id']): Promise<IResult[]> => {
  const results = await Result.find({ createdBy: userId })
  .populate('subjectId', 'subjectName')
  .exec();
  return results;
};
