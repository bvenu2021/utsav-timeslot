const mongoose = require('mongoose')
const validator = require('validator')

const ITMilanUtsav = mongoose.model('ITMilanUtsav', {
    prakhand: {
        type: String,
        required: true,
        trim: true
    },
    khand: {
        type: String,
        required: true,
        trim: true
    },
    valay: {
        type: String,
        required: true,
        trim: true
    },
    milan: {
        type: String,
        required: true,
        trim: true
    },
    utsavStartTime: {
        type: String,
        required: true
    },
    utsavEndTime: {
        type: String,
        required: true
    },
    utsavVenue: {
        type: String,
        required: true,
        trim: true
    }
})

module.exports = ITMilanUtsav