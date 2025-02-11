import Category, { ICategory } from '@models/Category';

export const createCategory = async (categoryData:ICategory): Promise<ICategory | null> => {
  const category = new Category(categoryData);
  await category.save();
  return getCategoryById(category.id);
};

export const getCategorys = async (): Promise<ICategory[]> => {
  return await Category.find({}).exec();
};

export const getCategoryById = async (categoryId: string): Promise<ICategory | null> => {
  return await Category.findById(categoryId).exec();
};

export const getCategoryByUserId = async (userId: string): Promise<ICategory[]> => {
  return await Category.find({ userId }).exec();
};

export const updateCategory = async (categoryId: string, categoryData: Partial<ICategory>): Promise<ICategory | null> => {
  return await Category.findByIdAndUpdate(categoryId, categoryData, { new: true, runValidators: true }).exec();
};

export const deleteCategory = async (categoryId: string): Promise<void> => {
  await Category.findByIdAndDelete(categoryId).exec();
};
