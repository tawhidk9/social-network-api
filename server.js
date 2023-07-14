//express
const express = require('express');
//mongoose
const db = require('./config/connection.js');

//app/port
const app = express();
const PORT = process.env.PORT || 4000;
//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


db.once('open', () => {
    app.listen(PORT, () => console.log (`Yay ${PORT}`))
});