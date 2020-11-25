require('dotenv').config()
const mongoose= require('mongoose')
const {app}= require('./app')

mongoose.connect(process.env.DB_URL,
    { useNewUrlParser: true, useUnifiedTopology: true })
.then(console.log('Successfully Connected to The Database'))

app.listen(3000)







































