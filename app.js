const express = require('express')

const app = express()

const mongoose = require('mongoose')

const categoryRoutes = require('./routes/category')

const productRoutes = require('./routes/product')

const userRoutes = require('./routes/user')

const path = require('path')


mongoose.connect('mongodb+srv://ninon_2:ninon_2@drog.hnpbv50.mongodb.net/?retryWrites=true&w=majority')
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'));

app.use(express.json())


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

  


app.use('/api/category' , categoryRoutes)

app.use('/api/product', productRoutes)

app.use('/api/auth',userRoutes)


app.use('/images', express.static(path.join(__dirname, 'images')))

module.exports = app ;