const Reader = require("../../models/reader.model");
const Book = require('../../models/book.model');
const asyncHandler = require('express-async-handler');
const generateString = require("../../helpers/generateString");

const create = asyncHandler(async (req, res) => {
    try {
        req.body.token = generateString.generateRandomString(20);
        const user = await Reader.create(req.body);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ massage: `Lỗi! ${error}` });
    }
})

const getInfo = asyncHandler(async (req, res) => {
    try {
        const token = req.cookies.tokenUser;
        const reader = await Reader.findOne({
            token: token,
        })
        res.status(200).json({ message: 'Get info successfully', reader });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

})

const updateInfo = async (req, res) => {
    try {
  
      const readerId = req.params.id;
      const existingReader = await Reader.findById(readerId);
  
      if (!existingReader) {
        return res.status(404).json({ message: `Không tìm được user với ID: ${readerId}` });
      }
  
      const data = {
        ...req.body,
      };
      const reader = await Reader.findByIdAndUpdate(readerId, data, { new: true })
      if (!reader) {
        res.status(404).json({ message: `Không tìm được user với ID: ${req.params.id}` })
      }
      res.status(200).json({ message: "Cập nhật thông tin thành công." });
    } catch (error) {
      res.status(500);
      throw new Error(error.message)
    }
  }

module.exports = {
    create,
    getInfo,
    updateInfo
}