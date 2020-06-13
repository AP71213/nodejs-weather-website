const request = require('request')
const log = console.log

const weatherFetchCallback = (error, data) => {
    const info = {}
    if (error) {
        info.error = error
    } else {
        const data1 = data.body.current
        info.temperature = data1.temperature
        info.apparentTemperature = data1.feelslike
    }
    return info
}

const weatherFetch = (x, y, callBack) => {
    const url = 'http://api.weatherstack.com/current?access_key=e329751f05718da5448a977115b698fa&query=' +
        encodeURIComponent(x.toString()) + ',' + encodeURIComponent(y.toString())
    request({
            url,
            json: true
        },
        (error, response) => {
            if (response === undefined) {
                callBack(weatherFetchCallback('WEATHER STACK unable to fetch results!'))
            } else if (response.body.error === undefined) {
                callBack(weatherFetchCallback('', response))
            } else {
                callBack(weatherFetchCallback(response.body.error.info))
            }
        }
    )
}

module.exports = {
    weatherFetch,
    weatherFetchCallback
}