const mongoose = require('mongoose')
const validator = require('validator')

const RegistrationData = mongoose.model('RegistrationData', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    contact: {
        type: Number,
        required: true
    },
    milan: {
        type: String,
        required: true,
        trim: true
    },
    valay: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    timeslot: {
        type: String,
        required: true
    },
    completedTime: {
        type: String,
        default: null
    }
})

module.exports = RegistrationData