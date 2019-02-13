const ODM = require('mongoose');

const userSchema = new ODM.Schema({
    _id: ODM.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    restaurant: [{
        type: ODM.Schema.Types.ObjectId,
        ref: 'Restaurant'
    }]
})

module.exports = ODM.model('User', userSchema);