const log = console.log

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message = document.querySelector('#message-1')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    message.textContent = 'Loading...'
    fetch('http://localhost:3000/weather?address=' + encodeURIComponent(location)).then((response) => {
        response.json().then((response) => {
            console.log(response)
            if (response.error)
                message.textContent = 'Unable to find the location'
            else message.textContent =
                `It's ${response.temperature} degrees outside but it feels like ${response.apparentTemperature} degrees.`
        })
    })
})