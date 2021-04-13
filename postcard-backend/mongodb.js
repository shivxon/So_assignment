const mongoose = require('mongoose');
require('dotenv').config()
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.connect(process.env.DB_CONNECT, { useUnifiedTopology: true });
mongoose.connection.once('open', function() {
    console.log('connection has been made');
}).on('error', function(error) {
    console.log('error is :', error);
});

module.exports = mongoose;