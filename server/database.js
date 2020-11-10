const mongoose = require('mongoose');

mongoose.connect('mongodb://db:27017', {
    useNewUrlParser: true,
    dbName: 'users',
    user: 'admin',
    pass: 'pass',
    useUnifiedTopology: true
})
