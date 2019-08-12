const request = require('request');

const forecast = (lat, long, callback) => {
    const url = 'https://api.darksky.net/forecast/c0a63e44063c436c648d8111b40296fc/'
     + lat + ',' + long + '?units=si';
    request({ url, json: true }, (error, response) => {
        const { temperature, visibility } = response.body.currently;
        const { timezone: timeZone, daily } = response.body;
        if(error){
            callback("No connection", undefined)
        } else if(response.body.error) {
            callback('No location found', undefined)
        } else {
            callback(undefined,{
                summary: daily.data[0].summary,
                temperature,
                timeZone,
                visibility
            })
        }
    })
}

module.exports = forecast;