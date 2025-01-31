import mongoose, { Schema, Document } from 'mongoose';
import * as validator from '@utils/helper/validationChecker';
import { MESSAGES } from '@utils/message';

export interface IProduct extends Document {
    productName: string;
    productDescription: string;
    productImage: string;
    price: number;
    quantity: number;
    categoryId: mongoose.Schema.Types.ObjectId;
    discount?: number;
    createdAt?: Date;
    updatedAt?: Date;
}

const ProductSchema: Schema = new Schema({
    productName: {
        type: String,
        required: [true, `Product name${MESSAGES.IS_REQUIRED}`],
    },
    productDescription: {
        type: String,
        required: [true, `Product description${MESSAGES.IS_REQUIRED}`],
    },
    productImage: {
        type: String,
        required: [true, `Product image${MESSAGES.IS_REQUIRED}`]
    },
    price: {
        type: Number,
        required: [true, `Product price${MESSAGES.IS_REQUIRED}`],
        min: [0, `Product price must be a positive number`]
    },
    quantity: {
        type: Number,
        required: [true, `Product quantity${MESSAGES.IS_REQUIRED}`],
        min: [0, `Product quantity cannot be less than zero`]
    },
    discount: {
        type: Number,
        validate: {
            validator: (value: number) => value >= 0 && value <= 100,
            message: `Discount must be between 0 and 100`
        }
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, `Category ID${MESSAGES.IS_REQUIRED}`],
        ref: 'Category'
    }
}, {
    timestamps: true
});

export default mongoose.model<IProduct>('Product', ProductSchema);
