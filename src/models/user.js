import mongoose from 'mongoose'

const { Schema } = mongoose

const UserSchema = new Schema({
    username: String,
    phone: {
        type: Number,
        required: true
    },
    address: {
        type: String 
    },
    iphone: {
        type: String,
    },
    loanAmount: {
        type: Number,
        required: true
    }
})

const User = mongoose.model("users", UserSchema)

export default User