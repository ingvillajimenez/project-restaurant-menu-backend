const ODM = require('mongoose');

const orderSchema = new ODM.Schema ({
    _id: ODM.Schema.Types.ObjectId,
    date: {
        type: Date,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    restaurant: {
        type: ODM.Schema.Types.ObjectId,
        ref: 'Restaurant'
    },
    user: {
        type: ODM.Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = ODM.model('Order', orderSchema);