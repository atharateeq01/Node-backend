import Product, { IProduct } from '@models/Product';

export const createProduct = async (productData: IProduct): Promise<IProduct | null> => {
  const product = new Product(productData);
  await product.save();
  return getProductById(product.id);
};

export const getProducts = async (): Promise<IProduct[]> => {
  return await Product.find({}).populate('categoryId').exec();
};

export const getProductById = async (productId: string): Promise<IProduct | null> => {
  return await Product.findById(productId).populate('categoryId').exec();
};

export const getProductByCategoryId = async (categoryId: string): Promise<IProduct[]> => {
  return await Product.find({ categoryId }).populate('categoryId').exec();
};

export const updateProduct = async (productId: string, productData: Partial<IProduct>): Promise<IProduct | null> => {
  return await Product.findByIdAndUpdate(productId, productData, { new: true, runValidators: true }).exec();
};

export const deleteProduct = async (productId: string): Promise<void> => {
  await Product.findByIdAndDelete(productId).exec();
};
