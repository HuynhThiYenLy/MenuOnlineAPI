const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const CartSchema = new Schema({
    products: [
        {
            productID: { type: ObjectId, ref: 'Product' },
            soLuong: Number
        }
    ],
});

module.exports = mongoose.model('Cart', CartSchema);
