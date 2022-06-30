const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode.js')
const weather = require('./utils/weather.js')


const app = express()
const port = process.env.PORT || 3000

// Define paths for express config
const viewsPath = path.join(__dirname, '../templates/views')
const publicDirectoryPath = path.join(__dirname, '../public')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

// Route handlers
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Sebastian Calcan'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Sebastian Calcan'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Sebastian Caclan',
        msg: 'We are here to help you. You can count on us ;)'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Adress must be provided!'
        })
    }

    geocode (req.query.address, (error, { location, name } = {}) => {
        if (error) {
            return res.send({ error })
        }
        
        weather(location, (error, data) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                location: name,
                forecast: data,
                search: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        errMsg: 'Help article not found!',
        name: 'Sebastian Caclan',
        title: '404'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        errMsg: 'Page not found!',
        name: 'Sebastian Calcan',
        title: '404'
    })
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}.`)
})