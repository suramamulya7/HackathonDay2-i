const mongoose = require('mongoose');

const storeSchema = mongoose.Schema({
    bookId: {
        type: Number,
        required: true
    },
    bookName: {
        type: String,
        required: true
    },
    authorName: {
        type: String,
        required: true
    },
    edition: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    copies: {
        type: Number,
        required: true
    }
},
 {
    timestamps: true  
});

const Store = mongoose.model('Store', storeSchema);
module.exports = Store;
