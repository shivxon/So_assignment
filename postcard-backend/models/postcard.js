const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let postCardSchema = Schema({
    postCard: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'User Id is required']
    },

}, {
    timestamps: true
});



module.exports = mongoose.model('Postcard', postCardSchema);