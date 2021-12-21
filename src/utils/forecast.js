const request = require('postman-request');

const forecast = (long, lat, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=15bb5a7891e1b67f9b62bef935d6892d&query=' + long + ',' + lat + '&units=f';

    request({ url: url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather services!')
        } else if (body.error) {
            callback('Unable to find location')
        } else {
            callback(undefined,
                body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + ' degrees out. The humidity is ' + body.current.humidity + '.'
            );
        }
    })

}
module.exports = forecast;