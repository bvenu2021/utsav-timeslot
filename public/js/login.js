const loginForm = document.querySelector('form')
const username = document.getElementById('username')
const password = document.getElementById('password')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

loginForm.addEventListener('submit', (e) => {
    e.preventDefault()

    messageOne.textContent = 'Loading....'

    console.log(username.value)
    console.log(password.value)
    const url = '/adminlogin?username=' + username.value + '&password=' + password.value
    fetch(url).then((response) => {
        response.json().then((data) => {
            console.log(data)
            if(data.error) {
                console.log(data.error)
                messageOne.textContent = data.error
            } else {
                window.location = "/admin"
            }
        })
    })
})