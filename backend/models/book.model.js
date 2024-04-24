const mongoose = require('mongoose')
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);

const bookSchema = new mongoose.Schema({
    bookTitle: {
        type: String,
        required: true
    },
    price: Number,
    quantity: Number,
    publishYear: String,
    publisherName: String,
    author: String,
    thumbnail: String,
    slug: {
        type: String,
        slug: "bookTitle",
        unique: true
    },
    deleted: {
        type: Boolean,
        default: false
    },
    deletedAt: Date,
    },
    { timestamps: true }
)

const Book = mongoose.model("Book", bookSchema, "books");

module.exports = Book;