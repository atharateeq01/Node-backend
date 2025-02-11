import mongoose, { Schema, Document } from 'mongoose';
import { MESSAGES } from '@utils/message';

// Updated interface
export interface ICart extends Document {
    userId: mongoose.Schema.Types.ObjectId;
    cartItems: { productId: mongoose.Schema.Types.ObjectId, itemAmount: number }[]; // cartItems array
    createdAt?: Date;
    updatedAt?: Date;
}

const CartSchema: Schema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, `User ID${MESSAGES.IS_REQUIRED}`],
        ref: 'User',
    },
    cartItems: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            required: [true, `Product ID${MESSAGES.IS_REQUIRED}`],
            ref: 'Product'
        },
        itemAmount: {
            type: Number,
            required: [true, `Item amount${MESSAGES.IS_REQUIRED}`],
            min: [1, `Item amount must be at least 1`]
        }
    }],
}, {
    timestamps: true
});

export default mongoose.model<ICart>('Cart', CartSchema);
