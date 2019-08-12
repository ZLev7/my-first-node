const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');


const app = express();
const port = process.env.PORT || 3000;

const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials')
//Setup handlebars and views location

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup express static directory

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'HBS Home Pages',
        name: 'Michael'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'HBS About Page',
        text: 'I am Groooooot!!!!!!'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        text: 'Help message',
        imgPath: '/images/collared-dove-1280.jpg'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You shouldn`t rely on machines!!!!'
        })
    }
    geocode(req.query.address, (error, { lattitude, longitude, placeName } = {}) => {
        if(error){
            return res.send({
                error: error
            })
        }
        forecast(lattitude, longitude, (error, { summary, temperature, timeZone, visibility } = {}) => {
            if(error){
                return res.send({
                    error: error
                })
            }
            res.send({
                summary,
                temperature,
                timeZone,
                visibility
            })
          })
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send(
            `<h1 style="color: red;">
                You shouldn\`t rely on machines
            </h1>
            `
        )
    } 
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 error',
        errorMessage: `Help article not found`
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 error',
        errorMessage: `Page not found`
    })
})

app.listen(port, () => {
    console.log('Server has started at '+ port)
})