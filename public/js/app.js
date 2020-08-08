const utsavForm = document.querySelector('form')
const name = document.getElementById('name')
const contact = document.getElementById('contact')
const valay = document.getElementById('Valays')
const milan = document.getElementById('Milans')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

// messageOne.textContent = ''
// messageTwo.textContent = ''

var select = document.getElementById('Valays')
var options = ['Sanjay Nagar', 'Mahalakshmi Puram', 'Dasara Halli']
var mlpMilans = ['Malleshwaram', 'Rajajinagar', 'Basaveshwaranagar', 'Mahalakshmipuram']
var snMilans = ['Sanjaynagar', 'Yashwantpur']
var dhMilans = ['Abbigere', 'Dasarahalli', 'AGB Layout']

options.forEach((option) => {
    var opt = document.createElement('option')
    opt.text = option
    opt.value = option
    select.appendChild(opt)
})

//const valayname = document.getElementById("Valays").value
var opt

var selectMilans = function selectMilan(valayname) {
    var milanSelect = document.getElementById('Milans')
    milanSelect.innerHTML = '<option value=\"\">Select</option>'

    switch (valayname) {
        case 'Sanjay Nagar':
            snMilans.forEach((milan) => {
                opt = document.createElement('option')
                opt.text = milan
                opt.value = milan
                milanSelect.appendChild(opt)
            })
            break;
        case 'Mahalakshmi Puram':
            mlpMilans.forEach((milan) => {
                opt = document.createElement('option')
                opt.text = milan
                opt.value = milan
                milanSelect.appendChild(opt)
            })
            break;
        case 'Dasara Halli':
            dhMilans.forEach((milan) => {
                opt = document.createElement('option')
                opt.text = milan
                opt.value = milan
                milanSelect.appendChild(opt)
            })
            break;
    
        default:
            break;
    }
}


utsavForm.addEventListener('submit', (e) => {
    e.preventDefault()

    messageOne.textContent = 'Loading....'
    messageTwo.textContent = ''

    const url = '/registration?name=' + name.value + '&contact=' + contact.value + '&valay=' + valay.value + '&milan=' + milan.value
    fetch(url).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
                console.log(data.error)
            } else {
                const uDayTime = new Date(data.user.timeslot)
                const uDay = uDayTime.toLocaleDateString()
                const uStart = uDayTime.toLocaleTimeString()
                const uEnd = new Date(uDayTime.setMinutes(uDayTime.getMinutes() + 10)).toLocaleTimeString()
                messageOne.textContent = 'Dhanyavad ' + data.user.name + ' ji for the registration.'
                messageTwo.textContent = 'Please attned Gurupuja Utsav on : ' + uDay + ', between ' + uStart + ' and ' + uEnd + '.'
                utsavForm.reset()
            }
        })
    })
})