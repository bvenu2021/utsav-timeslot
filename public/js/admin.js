const adminForm = document.querySelector('form')
const pName = document.getElementById('prakhand')
const kName = document.getElementById('khand')
const vName = document.getElementById('valay')
const mName = document.getElementById('milan')
// const uDate = document.getElementById('uDate')
const uStartTime = document.getElementById('uStartTime')
const uEndTime = document.getElementById('uEndTime')
const uVenue = document.getElementById('uVenue')

adminForm.addEventListener('submit', (e) => {
    e.preventDefault()

    // const startTime = new Date(uDate.value + ' ' + uStartTime.value)
    // const endTime = new Date(uDate.value + ' ' + uEndTime.value)

    console.log(uStartTime.value)
    console.log(uEndTime.value)

    const url = '/adminconfig?pName=' + pName.value + '&kName=' + kName.value + '&vName=' + vName.value + '&mName=' + mName.value + '&startTime=' + uStartTime.value + '&endTime=' + uEndTime.value + '&uVenue=' + uVenue.value
    fetch(url).then((response) => {
        if(response.error) {
            console.log(response.error)
        }
        adminForm.reset()
    }).catch((e) => {
        console.log(e)
    })
})
