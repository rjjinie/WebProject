const Book = require("../../models/book.model");
const ApiError = require('../../helpers/api-error');
const asyncHandler = require("express-async-handler");
const fs = require('fs');
const upload = require('../../middlewares/admin/upload');
const path = require('path')
const fsx = require('fs-extra');

const createBook = async (req, res) => {
  try {
    const book = await Book.create({
      ...req.body,
      thumbnail: req.file ? req.file.filename : null
    });
    res.status(200).json({ message: 'Thêm sách thành công.', book });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const getAll = async (req, res) => {
  try {
    const book = await Book.find({});
    res.status(200).json(book);
  } catch (error) {
    res.status(500);
    throw new Error(error.message)
  }
}

const getOne = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id)
    if (!book) {
      res.status(404).json({ message: `Không tìm được sách với ID: ${req.params.id}` })
    }
    res.status(200).json(book);
  } catch (error) {
    res.status(500);
    throw new Error(error.message)
  }
}

const updateOne = async (req, res) => {
  try {

    const bookId = req.params.id;
    const existingBook = await Book.findById(bookId);

    if (!existingBook) {
      return res.status(404).json({ message: `Không tìm được sách với ID: ${bookId}` });
    }

    // Check if a new image file is uploaded
    if (req.file) {
      // Remove the old image file
      if (existingBook.thumbnail) {
        const imagePath = path.join(__dirname, '..', '..', 'public', 'uploads', existingBook.thumbnail);
        fs.unlink(imagePath, (err) => {
          if (err) {
            console.error(`Lỗi khi xóa tệp hình ảnh cũ: ${err}`);
          } else {
            console.log(`Tệp hình ảnh cũ đã được xóa: ${existingBook.thumbnail}`);
          }
        });
      }
    }

    const data = {
      ...req.body,
      thumbnail: req.file ? req.file.filename : existingBook.thumbnail
    };
    const book = await Book.findByIdAndUpdate(bookId, data, { new: true })
    if (!book) {
      res.status(404).json({ message: `Không tìm được sách với ID: ${req.params.id}` })
    }
    res.status(200).json({ message: "Cập nhật sách thành công." });
  } catch (error) {
    res.status(500);
    throw new Error(error.message)
  }
}


const deleteOne = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id, req.body)
    if (!book) {
      res.status(404).json({ message: `Không tìm được sách với ID: ${req.params.id}` })
    }
    const imagePath = path.join(__dirname, '..', '..', 'public', 'uploads', book.thumbnail);

    if (book.thumbnail) {
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error(`Lỗi khi xóa tệp hình ảnh cũ: ${err}`);
        } else {
          console.log(`Tệp hình ảnh cũ đã được xóa: ${book.thumbnail}`);
        }
      });
    }
    res.status(200).json({ message: `Sách: ${req.params.id} đã được xóa.` });
  } catch (error) {
    res.status(500);
    throw new Error(error.message)
  }
}

const deleteAll = async (req, res) => {
  try {
    const result = await Book.deleteMany({});
    // Đường dẫn đến thư mục "uploads"
    const uploadDir = path.join(__dirname, '..', '..', 'public', 'uploads');

    // Xóa thư mục "uploads" đệ quy
    await fsx.emptyDir(uploadDir);

    res.status(200).json({ message: `Đã xóa ${result.deletedCount} sách.` });
  } catch (error) {
    res.status(500);
    throw new Error(error.message)
  }
}

module.exports = {
  createBook,
  getAll,
  getOne,
  updateOne,
  deleteOne,
  deleteAll,
} 