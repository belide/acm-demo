var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LinkSchema = new Schema({
    name: String,
    link: String
})

// registering Schema
mongoose.model('Link', LinkSchema);
