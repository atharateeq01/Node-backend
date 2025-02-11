import mongoose, { Schema, Document } from 'mongoose';
import { MESSAGES } from '@utils/message';

export interface IOrder extends Document {
    orderName: string;
    orderAmount: number;
    orderStatus: 'Delivered' | 'Processing' | 'Cancelled';
    userId: mongoose.Schema.Types.ObjectId;
    products: {
        productId: mongoose.Schema.Types.ObjectId;
        productPrice: number;
        discountApplied: number;
        itemAmount: number;
    }[];
    receiverAddress: string;
    receiverPhoneNumber: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const OrderSchema: Schema = new Schema({
    orderName: {
        type: String,
        required: [true, `Order name${MESSAGES.IS_REQUIRED}`]
    },
    orderAmount: {
        type: Number,
        required: [true, `Order amount${MESSAGES.IS_REQUIRED}`],
        min: [0, `Order amount must be at least 0`]
    },
    orderStatus: {
        type: String,
        enum: ['Delivered', 'Processing', 'Cancelled'],
        required: [true, `Order status${MESSAGES.IS_REQUIRED}`]
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, `User ID${MESSAGES.IS_REQUIRED}`],
        ref: 'User',
    },
    products: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            required: [true, `Product ID${MESSAGES.IS_REQUIRED}`],
            ref: 'Product'
        },
        productPrice: {
            type: Number,
            required: [true, `Product price${MESSAGES.IS_REQUIRED}`],
            min: [0, `Product price must be at least 0`]
        },
        discountApplied: {
            type: Number,
            default: 0,
            min: [0, `Discount must be at least 0`]
        },
        itemAmount: {
            type: Number,
            required: [true, `Item amount${MESSAGES.IS_REQUIRED}`],
            min: [1, `Item amount must be at least 1`]
        }
    }],
    receiverAddress: {
        type: String,
        required: [true, `Receiver address${MESSAGES.IS_REQUIRED}`]
    },
    receiverPhoneNumber: {
        type: String,
        required: [true, `Receiver phone number${MESSAGES.IS_REQUIRED}`],
    }
}, {
    timestamps: true
});

export default mongoose.model<IOrder>('Order', OrderSchema);