const mongoose = require('mongoose');
const Shema = mongoose.Schema;

const QAShema = new Shema({
    question: { type: String, required: true },
    answer: { type: String, required: true },
});

module.exports = mongoose.model('QA', QAShema);