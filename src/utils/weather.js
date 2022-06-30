const request = require('request')

const weather = (coordinates, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=cec884782743762a775f1b1c88a0e636&query=${coordinates}&units=m`

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Failed to connect to the Weatherstack API!')
        } else if (body.error) {
            callback('Wrong input for Weatherstack!', undefined)
        } else {
            const {current:data} = body
            callback(undefined, `${data.weather_descriptions[0]}. It is currently ${data.temperature} degrees. There is a ${data.precip * 100}% chance of rain.
            There is a humidity of ${data.humidity} and a wind speed of ${data.wind_speed} km/h`)
        }
    })
}

module.exports = weather