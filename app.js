const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const User = require('./models/user')

const app = express()

app.set('view engine', 'ejs')
app.set('views', 'views')

const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')
const notFound = require('./routes/404')

app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'public')))

app.use((req, res, next) => {
    User.findById('5ccafe0a607e82667e54d3cd')
      .then(user => {
          req.user = user
          next()
      })
      .catch(err => console.log(err))
})

app.use('/admin',adminRoutes)
app.use(shopRoutes)
// 404 error
app.use(notFound)

mongoose.connect(
    'mongodb+srv://node-shop:F0gDYBICkayxtlXF@cluster0-9tnpw.mongodb.net/node-shop?retryWrites=true', {
        useNewUrlParser: true
    })
.then(() => {
    User.findOne()
      .then(user => {
          if(!user) {
            const user = new User({
                name: 'Viktor',
                email: 'test@test.com',
                cart: {
                    items: []
                }
            })
            user.save()
          }
      })
    app.listen(3000)
    console.log('connected')
})
.catch(err => {
    console.log(err)
})