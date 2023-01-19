const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//Define paths for Express configs
const publicDirectoryPath = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Set up handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Set up static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name:'Eugene Tan',
        footer: 'Created by Eugene Tan'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        creator: 'Eugene Kyler Tan',
        description: 'Student',
        footer: 'Created by Eugene Tan'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Contact Person',
        phone: '82868689',
        footer: 'Created by Eugene Tan'
    })
})

app.get('/weather', (req, res) => {

    if(!req.query.address){
        return res.send({
            Error:'Please provide an address'
        })
    }

    geocode(req.query.address, (error, data = 0) => {
        if(error){
            return res.send({ error })
        }

        forecast(data.latitude, data.longtitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }
            res.send({
                data: data,
                forecast: forecastData,
                address: req.query.address
            })
        })
    })
    // res.send({
    //     Forecast: 'Windy',
    //     Temperature: '25 Degrees Celsius',
    //     Address: req.query.address
    // })

    

    // res.render('weather', {
    //     title: 'Weather today',
    //     country: 'Singapore',
    //     location: 'Toa payoh',
    //     footer: 'Created by Eugene Tan'
    // })
})

app.get('/product', (req, res) => {
    if(!req.query.search){
        return res.send({
            Error:'Please provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        product: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        help: 'help article not found',
        footer: 'Created by Eugene Tan'
    })
})

app.get('/*', (req, res) => {
    res.render('404', {
        help: 'Page not found',
        footer: 'Created by Eugene Tan'
    })
})

// app.get('', (req, res) => {
//     res.send('<h1>Weather</h1>')
// })

// // non-array example
// app.get('/help', (req, res)=>{
//     res.send({
//         Name:'Eugene',
//         Age: 27
//     })
// })


// //Array example
// app.get('/help', (req, res) => {
//     res.send([
//         { 
//             Name: 'Eugene',
//             Age: 27,
//         },{
//             Name:'Valantia',
//             Age: 27
//         }
//     ])
// })

// app.get('/about', (req, res) => {
//     res.send('<h1>About</h1>')
// })

// app.get('/weather-forecast', (req, res) => {
//     res.send({
//         Location: 'Singapore',
//         Temperature: '28 Degrees Celsius'
//     })
// })
// //Example: we own the website called app.com, app.com/help, app.com/about

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})