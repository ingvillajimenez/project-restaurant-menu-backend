const ODM = require('mongoose');

const menuSchema = new ODM.Schema ({
    _id: ODM.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    course: {
        type: String,
        required: true
    },
    restaurant: {
        type: ODM.Schema.Types.ObjectId,
        ref: 'Restaurant'
    }
})

module.exports = ODM.model('Menu', menuSchema);