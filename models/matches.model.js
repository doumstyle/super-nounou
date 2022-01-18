const mongoose = require('mongoose');
const { model, Schema } = mongoose;

const matchesSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "users",
    },
    role: {
        type: [Schema.Types.ObjectId]
       ref: "users",
    },
});

module.exports = model('Match', matchesSchema);