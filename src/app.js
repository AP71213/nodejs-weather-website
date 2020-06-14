const express = require('express')
const weatherFetch = require('./utils/weatherStackUtil').weatherFetch
const path = require('path')
const hbs = require('hbs')
const geoCode = require('./utils/geoCodeutil')
const port = process.env.PORT || 3000

const app = express()

const publicDirectory = path.join(__dirname, '/../public')
const viewsDirectory = path.join(__dirname, '/../template/views')
const partialsDirectory = path.join(__dirname, '/../template/partials')

app.set('view engine', 'hbs')
app.set('views', viewsDirectory)
hbs.registerPartials(partialsDirectory)

app.use(express.static(publicDirectory))

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Home Page',
        name: 'Amber Pundeer'
    })
})

app.get('/weather', (req, res) => {
    if (req.query.address) {
        let add = req.query.address
        //calling geo code
        geoCode.geocoding(add, (info) => {
            if (info.lat) {
                //calling weather Fetch
                weatherFetch(info.lat, info.long, (wf) => {
                    if (wf.error) {
                        info = {
                            error: wf.error
                        }
                    } else {
                        info.temperature = wf.temperature
                        info.apparentTemperature = wf.apparentTemperature
                    }
                    return res.send(info)
                })
            }
            else {
                return res.send(info)
            }
        })
    } else {
        res.send({
            error: 'Missing location name'
        })
    }
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Amber Pundeer'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Amber Pundeer'
    })
})

app.get('/*', (req, res) => {
    res.render('404', {
        title: 'Error 404: Page Not Found',
        name: 'Amber Pundeer'
    })
})

app.listen(port, () => {
    console.log('Server up and running.')
})