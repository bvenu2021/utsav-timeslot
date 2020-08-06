require('../db/mongoose')
const RegistrationData = require("../model/ss_data");
const ITMilanUtsav = require("../model/itmlan");

function getRegistrationCount(mName) {
    RegistrationData.countDocuments({ milan: mName}).then((count) => {
        return count;
    }).catch((e) => {
        throw e
    })
}

function getMilanDetails(mName) {
    ITMilanUtsav.findOne({ milan: mName}).then((data) => {
        return new ITMilanUtsav(data)
    }).catch((e) => {
        throw e
    })
}

function getTimeslot(mName) {
    try {
       const milanData = getMilanDetails(mName) 
       const regCount = getRegistrationCount(mName)

       var newTimeslot = new Date(milanData.utsavStartTime)
       var nextSlot = (Math.floor(regCount/5)) * 10
       
       newTimeslot.setMinutes(newTimeslot.getMinutes() + nextSlot)

       return new Date(newTimeslot)
    } catch(e) {
        throw e
    }
}

module.exports = getTimeslot