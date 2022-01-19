const mongoose = require('mongoose');
const { model, Schema } = mongoose;

const matchesSchema = new Schema({
    babysitters: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    families: {
        type: Schema.Types.ObjectId,
       ref: "User"
    }, 
    distance: Number

});

module.exports = model('Match', matchesSchema);
