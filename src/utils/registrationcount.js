const RegistrationData = require('../model/ss_data')

require('../db/mongoose')

const qtime = 10
module.exports = (mName, callback) => {
    RegistrationData.countDocuments({milan: mName}, (err, count) => {
        if(err) {
            callback('Unable to get total registration count for the given milann', undefined)
        } else {
            var slotNo = Math.floor(count/5)
            var nextSlot = slotNo * 10
            callback(undefined, nextSlot)
        }
    })
}