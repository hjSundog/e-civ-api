const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ActionSchema = new Schema({
    owner_id: {
        type: Schema.Types.ObjectId
    },
    id: {
        type: Schema.Types.ObjectId
    }
    name: {
        type: String,
        unique: true,
        require: true
    },
    duration: {
        type: Date
    },
    type: {
        type: String,
        require: true
    },
    des: {
        type: String
    },
    disperseable: {
        type: String
    }
})

module.exports = mongoose.model('Action',ActionSchema)