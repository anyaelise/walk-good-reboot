var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var IncidentSchema   = new Schema({
    type: String,
    community: String,
    parish: String,
    date: Date,
    time: Date,
    description: String,
    age: Number,
    gender: String,
    identity: String    
}, 
{    
    timestamps: true 
});

module.exports = mongoose.model('Incident', IncidentSchema);
