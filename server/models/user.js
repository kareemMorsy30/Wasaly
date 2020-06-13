const mongoose = require('mongoose')
const validator = require('validator');
const bcrypt= require('bcrypt')

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
    status: { type: String, default: "offline" },
    role: { type: String, required: true, enum: ['customer', 'admin', 'serviceowner', 'productowner'] },
    phones: [{ type: String, required: true, match: '(01)[0-9]{9}' }],
    address:[{
        street: { type: String, required: true },
        city: { type: String, required: true },
        area: { type: String, required: true }
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
userSchema.pre('save', async function (next) {
    console.log("this::", this);
    if (!this.isModified('password'))
        return next();
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(this.password, salt);
        this.password = hash;
        next();
    } catch (error) {
        return next(error)
    }

});
userSchema.methods.isPasswordMatch = function (password, hashed, callback) {
    bcrypt.compare(password, hashed, (err, sucess) => {
        if (err) {
            return callback(err);
        }
        return callback(null, sucess);
    });
}
module.exports= mongoose.model('User', userSchema)