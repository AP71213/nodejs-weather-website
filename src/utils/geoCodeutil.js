const request = require('request')
const log = console.log
const express = require('express')
const app = express()
let info = {}

const geocodeCallback = (error, data) => {
    if (error) {
        info = {error: error}
    } else if (data) {
        const data1 = data.body.features[0].center
        info = {
            place : data.body.features[0].place_name,
            lat: data1[1],
            long: data1[0]
        }
    }
    return info
}

const geocoding = (address, callBack) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?' +
        'access_token=pk.eyJ1IjoiYW1iZXJwdW5kZWVyIiwiYSI6ImNrYTlnNG1zMzBtbDgycnA0cGZpc3AwZHkifQ.Gy6H-xPatfZWa-_H5yDdGA&' +
        'limit=1'

    request({
        url,
        json: true
    }, (error, response) => {
        if (response === undefined) {
            console.log(1)
            callBack(geocodeCallback('MAPBOX not able to get a response!'))
        } else if (response.body.message === undefined) {
            if (response.body.features[0]) {
                callBack(geocodeCallback('', response))
                console.log(2)
            } else {
                callBack(geocodeCallback('Please enter a valid location!'))
                console.log(3)
            }
        } else {
            callBack(geocodeCallback(response.body.message))
            console.log(4)
        }
    })
}

module.exports = {
    geocoding
}