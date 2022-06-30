const request = require('request')

const geocode = (adress, callback) => {
    const url = `http://api.positionstack.com/v1/forward?access_key=04695bf1fa1998646fadf575809b4c28&query=${encodeURIComponent(adress)}`

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to Positionstack API!', undefined)
        } else if (body.data === undefined || body.data.length === 0) {
            callback(`No results were found for ${adress}`, undefined)
        } else {
            const { data } = body
            callback(undefined, {location: `${data[0].latitude},${data[0].longitude}`, name: data[0].label})
        }
    })
}

module.exports = geocode