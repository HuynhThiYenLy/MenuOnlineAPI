const mongoose = require('mongoose');
const Shema = mongoose.Schema;
const ObjectId = Shema.ObjectId;

const ProductShema = new Shema({
    name: { type: String, required: true },
    gia: { type: Number, required: true },
    img: { type: String, required: true },
    kichCo: { type: String, required: true },
    xuatXu: { type: String, required: true },
    tinhTrang: { type: Number, required: true },
    categoryID: { type: ObjectId, ref: 'Category' },
});

module.exports = mongoose.model('Product', ProductShema);