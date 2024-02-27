const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({

    idUserName: {
        type: String,
        required:true
    },
    fullname: {
        type: String,
        required: true
    },
    icon: {
        type: Object,
        required: true
    },
    initialText:{
        type:String,
        required: true
    },
    pictures:{
        type: Object,
    },
    time:{
        type:Date,
        required:true,
        default: Date.now
    }, 

    commentsNumber:{
        type: Number,
        required:true,
        default: 0
    },

    likes: {
        type: Number,
        required:true,
        default: 0
    },
    
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'comments'
    }],
    
}); 

module.exports = mongoose.model('posts', PostSchema);
