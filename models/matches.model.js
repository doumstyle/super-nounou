const mongoose = require('mongoose');
const { model, Schema } = mongoose;

const matchesSchema = new Schema({
    babysitter: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    family: {
        type: Schema.Types.ObjectId,
       ref: "User"
    }
});

module.exports = model('Match', matchesSchema);
