const mongoose = require('mongoose')
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);

const readerSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    token: String,
    birthDate: Date,
    gender: Boolean,
    address: String,
    phone: String,
    borrow: [
        {
            id_book: String,
            status: {
                type:String,
                default: "processing" //processing accepted refused returned
            },
            borrowDate: String,
            returnDate: String,
            quantity: {
                type: Number,
                default: 1,
                require: true,
            },
        }
    ],
    deleted: {
        type: Boolean,
        default: false
    },
    deletedAt: Date,
},
    { timestamps: true }
)

const Reader = mongoose.model("Reader", readerSchema, "readers");

module.exports = Reader;