const request = require('request')


const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=c346916294d6bb72152262b811b2170a&query=' + latitude + ',' + longitude + '&units=f'
    request({url, json: true}, (error, {body} = {} ) => {
        if(error) {
            callback('ubable to connect to location services!', undefined)
        } else if(body.error) {
            callback('unable to fnde location', undefined)
        } else {
            callback(undefined, 
                body.current.weather_descriptions[0] +' it is currently ' + body.current.temperature + ' degrees out. It feels lik ' + body.current.feelslike + ' degress out. The humidity is ' + body.current.humidity + '%.'
            )
        }
    })
}

module.exports = forecast