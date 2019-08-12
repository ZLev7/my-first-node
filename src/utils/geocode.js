const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + 
    '.json?access_token=pk.eyJ1Ijoid2hlbHplZXdob29sIiwiYSI6ImNqeXRvMDM1MTA1b3kzbXJyNTFtbXA4ZGsifQ.Ip1u__Cy4m0xT0aCaK6ciw&limit=1';

    request({ url, json: true}, (error, response) => {
        if(error){
            callback('Unable to connect to service', undefined)
        } else if(response.body['features'].length === 0){
            callback("Unable to find location", undefined)
        } else {
            const { features } = response.body;
            callback(undefined,{
                lattitude: features[0].center[1],
                longitude: features[0].center[0],
                placeName: features[0].place_name
            })
        }
    })
}

module.exports = geocode