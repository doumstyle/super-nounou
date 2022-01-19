const mongoose = require('mongoose');
const { model, Schema } = mongoose;

const likesSchema = new Schema({

    liker : {
        type: Schema.Types.ObjectId,
        ref: "User",
    },

    liked : {
        type: Schema.Types.ObjectId,
        ref: "User",
    },


});

module.exports = model('Like', likesSchema);