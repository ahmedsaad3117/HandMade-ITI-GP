const mongoose = require('mongoose');

const product = require("./Product");

const OrderItemSchema = mongoose.Schema({
    // product: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Product",
    //     required: true
    // },
    quantity: {
        type: Number,
        required: true,
    },
});

OrderItemSchema.virtual("id").get(function() {
    return this._id.toHexString();
});

OrderItemSchema.set("toJSON", {
    virtuals: true,
});

exports.OrderItems = mongoose.model("OrderItems", OrderItemSchema);
module.exports = mongoose.model("OrderItems", OrderItemSchema);