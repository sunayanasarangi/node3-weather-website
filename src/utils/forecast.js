
const request = require('postman-request')

const forecast = (lat, lon, callback) => {
    const url = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=226cf403d416ae0fe0db58efdd2a8a64&units=metric'

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Couldnot connect to the weather api', undefined)
        } else if (body.cod === '400') {
            callback('Unable to find location', undefined)
        } else {
            const data = body.weather[0].main + '. It is currently ' + body.main.temp + ' degrees. But feels like ' + body.main.feels_like + ' degrees.'
            callback(undefined, data)
        }
    })
}

module.exports = forecast