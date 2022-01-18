const mongoose = require('mongoose');
const { model, Schema } = mongoose;

const matchesSchema = new Schema({
    babysitter: {
        type: Schema.Types.ObjectId,
        ref: "users",
    },
    family: {
        type: [Schema.Types.ObjectId],
       ref: "users"
    },
});

module.exports = model('Match', matchesSchema);