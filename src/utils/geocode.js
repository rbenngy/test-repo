const request = require('postman-request');

const geocode = (addr, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(addr) + '.json?access_token=pk.eyJ1Ijoicm9nZXJiZW5uIiwiYSI6ImNrd3BlazJiazBhMmoyb3A0MWZtZG5sZ28ifQ.fyPEKiUrvS3KEyOil8RnMg&limit=1';

    request({url: url, json: true}, (error, {body}) => {
        if (error){
            callback('Unable to connect to location services!')
        } else if (body.features.length === 0){
            callback('Unable to find matching location. Try another search')
        } else {
            callback(undefined, {
                long: body.features[0].center[0],
                lat: body.features[0].center[1],
                location: body.features[0].place_name,
            });
        }    
    })

}
module.exports = geocode;