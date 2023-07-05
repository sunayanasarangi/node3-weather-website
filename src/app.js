const path = require('path')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const express = require('express')
const hbs = require('hbs')

console.log(__dirname)
console.log(path.join(__dirname, '../public'))

const app = express()
const port = process.env.PORT || 3000

//Define paths for express configuration
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Sunayana Sarangi'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Sunayana Sarangi'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Sunayana Sarangi',
        message: 'Thank you for contacting us!'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) 
            return res.send({ error })
    
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) 
                return res.send({ error })
            
            res.send({
                address: req.query.address,
                forecast: forecastData,
                location
            })
        }) 
    })

})

app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMessage: 'Help article is not found',
        name: 'Sunayana Sarangi',
        title: '404'
    })
})
//404 route needs to come after all other routes
app.get('*', (req, res) => {
    res.render('404', {
        errorMessage: 'Page not found',
        name: 'Sunayana Sarangi',
        title: '404'
    })
})

app.listen(port, () => {
    console.log('Server is up on port .' + port)
})