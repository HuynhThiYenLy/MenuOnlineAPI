const QAModel = require('./QAModel');

// GET ALL
const getAll = async () => {
    try {
        const QA = await QAModel.find();
        return QA;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// Tạo
const insert = async (question, answer) => {
    try {
        const newQA = new QAModel({ question, answer });
        await newQA.save();
        return newQA;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = { getAll, insert };
