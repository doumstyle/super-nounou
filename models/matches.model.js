const mongoose = require('mongoose');
const { model, Schema } = mongoose;

const matchesSchema = new Schema({
    liker: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    liked: {
        type: Schema.Types.ObjectId,
       ref: "User"
    }
});

module.exports = model('Match', matchesSchema);
