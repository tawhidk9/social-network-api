//mongoose
const mongoose = require('mongoose');
//connect to mongoose
mongoose.connect('mongodb://localhost:27017/networkDB')
//export
module.exports = mongoose.connection;