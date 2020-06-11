const mongoose = require('mongoose')
const validator = require('validator');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 3 },
    username: { type: String, required: true, minlength: 3, unique: true },
    email: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value))
                throw Error("Invalid Email Format");
        }
    },
    status: { type: String, enum: ['online', 'offline'], default: "offline" },
    role: { type: String, required: true, enum: ['customer', 'admin', 'serviceowner', 'productowner'] },
    phones: [{ type: String, required: true, mathc: '(01)[0-9]{9}' }],
    address:[{
        street: { type: String, required: true },
        city: { type: String, required: true },
        area: { type: String, required: true },
        location: {
            latitude: {type: Number, required: true},
            longitude: {type: Number, required: true}
        }
    }],
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
    image_path: {
        type: String,
    },
})

module.exports= mongoose.model('User', userSchema)