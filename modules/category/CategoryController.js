const CategoryModel = require('./CategoryModel');

// GET ALL
const getAll = async () => {
    try {
        const categories = await CategoryModel.find();
        return categories;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// GET danh mục parentID null
const getParent = async () => {
    try {
        const categories = await CategoryModel.find({ parentID: null });
        return categories;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// GET danh mục con của một danh mục cha cụ thể
const getSub = async (parentID) => {
    try {
        const categories = await CategoryModel.find({ parentID: parentID }).populate('parentID', '_id name');
        return categories;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// Tạo
const insert = async (name, parentID) => {
    try {
        const newCategory = new CategoryModel({ name, parentID });
        await newCategory.save();
        return newCategory;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// xóa
const remove = async (catId) => {
    try {
        await CategoryModel.findByIdAndDelete(catId);
        return { message: "Xóa danh mục thành công" };
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const update = async (catId, name, parentID) => {
    try {
        const updatedCategory = await CategoryModel.findByIdAndUpdate(catId, { name, parentID }, { new: true });
        return updatedCategory;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = { getAll, getParent, getSub, insert, update, remove };
