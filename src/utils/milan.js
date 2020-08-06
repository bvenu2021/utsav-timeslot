const ITMilanUtsav = require('../model/itmlan')
const RegistrationData = require('../model/ss_data')

require('../db/mongoose')
require('../model/itmlan')

module.exports = (mName, callback) => {
    ITMilanUtsav.findOne({ milan: mName }, (err, data) => {
        if (err) {
            callback('Unable to get Milan utsav time', undefined)
        } else {
            var slotNo = 0
            var nextSlot = 0
            RegistrationData.countDocuments({ milan: mName }, (err, count) => {
                if (err) {
                    callback('Unable to get total registration count for the given milan', undefined)
                } else {
                    if (count > 0) {
                        var slotNo = Math.floor(count / 5)
                        var nextSlot = slotNo * 10
                    }
                }
            }).then(() => {
                if(!data) {
                    callback('Utsav is not planned for this milan. Pl. contact your Karyavah', undefined)
                }
                var newSlot = new Date(data.utsavStartTime)
                newSlot.setMinutes(newSlot.getMinutes() + nextSlot)
                callback(undefined, newSlot)
            }).catch((e) => {
                callback('Unable to register!')
            })
        }
    })
}