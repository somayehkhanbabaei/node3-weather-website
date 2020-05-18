const path = require('path')
const express = require('express')
const hbs = require('hbs')
const request = require('request')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname , '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')
// setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

// setup static directory to server
app.use(express.static(publicDirectoryPath))


app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'somayeh'
    })
})

app.get('/about',(req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'amin'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'this is some helpful text.',
        title: 'Help',
        name: 'Taraneh'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide a search term'
        })
    } 
        geocode(req.query.address, (error, {latitude, longitude ,location} = {}) => {
            if(error) {
                return res.send({
                    error: error
                })
            }
            forecast(latitude, longitude, (error, forecastData) => {
                if(error) {
                    return res.send({error })
                }
                res.send({
                    forecast: forecastData,
                    location,
                    address: req.query.address
                })
            })
        })
    }

)


app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'you must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Page not Found!',
        name: 'system error',
        errorMessage: 'CAN NOT FOUNF PAGE'
    })
})

app.get('*', (req, res) => {
   res.render('404', {
       title: '404',
       name: 'network',
        errorMessage : 'my 404 page'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})