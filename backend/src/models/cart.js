import mongoose from "mongoose";

const cartSchema=mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true},
        
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
        required: true
    },
},
{timestamps: true,
versionKey: false,});

cartSchema.index({ unique: true });

const Cart=mongoose.model("Cart",cartSchema);


export default Cart;