const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        max: 500
    },
    img:{
        type: String
    },
    hashtags: {
        type: Array,
        required: false
    },
    likes: {
        type:Array,
        default:[]
    },
    tags: {
        type: Array,
        required: false
    },
},
{timestamps: true}
);

module.exports = mongoose.model('Post', PostSchema);

