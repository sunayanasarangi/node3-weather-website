
const request = require('postman-request')

const geocode = (address, callback) => {
    const url = 'https://api.openweathermap.org/geo/1.0/direct?q=' + encodeURIComponent(address) + '&limit=1&appid=226cf403d416ae0fe0db58efdd2a8a64'

    request({ url, json: true }, (error, {body}) => {
        debugger
        if (error) {
            callback('Unable to connect to weather api', undefined)
        } else if (body.cod === '400' || body.length === 0) {
            callback('Unable to find location. Try another search', undefined)
        } else {
            const data = {
                latitude: body[0].lat,
                longitude: body[0].lon,
                location: body[0].name + ', ' + body[0].state + ', ' + body[0].country
            }
            callback(undefined, data)
        }
    })
}

module.exports = geocode
