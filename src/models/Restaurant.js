const ODM = require('mongoose');

const restaurantSchema = new ODM.Schema({
    _id: ODM.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    user: {
        type: ODM.Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = ODM.model('Restaurant', restaurantSchema);