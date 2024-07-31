const mongoose = require('mongoose');
const Shema = mongoose.Schema;
const ObjectId = Shema.ObjectId;

const CategoryShema = new Shema({
    name: { type: String, required: true },
    parentID: { type: ObjectId, ref: 'Category', default: null },
});

module.exports = mongoose.model('Category', CategoryShema);