
const request = require('request')

const geocode = (address, callback) => {
    const url = 'http://api.openweathermap.org/geo/1.0/zip?zip=' + address + '&appid=11d3666012a737b1ae7521eeff997b34'
    // E14,GB

    request({url: url, json: true}, (error, response) => {
        if(error){
            callback('unable to connect to location services') 
        } else if (response.body.message) {
            callback('unable to find location. Try another search', undefined)
        } else {
            callback(undefined, {
                latitude: response.body.lat,
                longitude: response.body.lon,
                name: response.body.name
            })
        }
    })
}

module.exports = geocode

