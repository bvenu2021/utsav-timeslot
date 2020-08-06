const RegistrationData = require('../model/ss_data')

require('../db/mongoose')
require('../model/ss_data')

module.exports = (mName, callback) => {
    RegistrationData.findOne({milan: mName}, (err, data) => {
        if(err) {
            console.log(err)
            callback('Unable to find registration data', undefined)
        } else {
            callback(undefined, data)
        }
    }).sort({_id: -1}).limit(1)
}