import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
    username: {
        type: String,
        requeired: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        requeired: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    join_date: {
        type: Date,
        default: Date.now
    },
    verifyToken: String,
    verifyTokenExpiry: Date
});

const User = mongoose.models.users || mongoose.model("users", UserSchema);
export default User;