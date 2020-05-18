const request =require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) +'.json?access_token=pk.eyJ1Ijoic29tYXllaGtoYW5iYWJhZWkiLCJhIjoiY2s5eWJ4azJqMDNqeTNmczJqZ2U5MGp1eiJ9.TXygnSLRMv5osy14BLaX1g&limit=1'
    request({ url, json: true}, (error, {body} = {}) => {
        if(error) {
            callback('ubable to connect to location services!', undefined)
        } else if(body.features.length === 0) {
            callback('unable to fnde location', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode