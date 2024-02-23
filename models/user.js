import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    displayName: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true
    }
});
module.exports = mongoose.model('User', UserSchema);