const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

// Define paths for express config
const publicFolder = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine','hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicFolder));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Roger Benn'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Roger Benn'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        message: 'This is a help message that is displayed in the paragraph',
        name: 'Roger Benn'
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
       return res.send({
        error: 'You must provide an address'
    }) 
    }

    geocode(req.query.address, (error, {lat, long, location} = {}) => {
        if (error) {
            return res.send({error}) 
        }
    
    
        forecast(lat, long, (error, forecastData) => {
            if (error){
                return res.send({error}) 
            }
            
            res.send({
                address: req.query.address,
                forecast: forecastData,
                location
            });

          })
    })


   
});

app.get('/products', (req, res) =>{
    if (!req.query.search){
       return res.send({
            error: 'You must provide a search term'
        })
    }
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404' , {
        title: '404',
        errorMessage: 'Help article not found.',
        name: 'Roger Benn'
    });
})

app.get('*', (req, res) => {
    res.render('404' , {
        title: '404',
        errorMessage: 'Page not found.',
        name: 'Roger Benn'
    });
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});