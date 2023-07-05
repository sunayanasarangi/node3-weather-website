const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msg1 = document.querySelector('#msg-1')
const msg2 = document.querySelector('#msg-2')


weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const address = search.value
    const url = './weather?address='+ encodeURIComponent(address)

    msg1.textContent = 'Loading...'
    msg2.textContent = ''
    

    fetch(url).then( (response) => {
        response.json().then( (data) => {
            if (data.error) {
                msg1.textContent = data.error
            } else {
                msg1.textContent = 'Location: ' + data.location
                msg2.textContent = 'Forecast: ' + data.forecast
            }
        })
    })
    
})
