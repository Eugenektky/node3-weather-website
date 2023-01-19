const request = require('request')

const forecast = (latitude, longtitude, callback) => {

    const forecasturl = 'http://api.weatherstack.com/current?access_key=d8792bcf5af16abcbe093b398c6e5389&query=' + latitude + ',' + longtitude + '&units=f'

    request ({url: forecasturl, json:true}, (error, response) => {
        if(error){
            callback('unable to connect to location services') 
        } else if (response.body.message) {
            callback('unable to find location. Try another search', undefined)
        } else {
            callback(undefined, response.body.current.weather_descriptions + '. This is the temperature today, ' + response.body.current.temperature + '. But it feels like ' + response.body.current.feelslike)
        }
    })
}

module.exports = forecast
