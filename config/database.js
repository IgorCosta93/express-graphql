//Configure here your data base connection
const mongoose = require('mongoose');
const mongoDB = 'mongodb://localhost/db';

mongoose.connect(mongoDB, {
    useNewUrlParser: true
});
mongoose.Promise = global.Promise;

module.exports = mongoose;