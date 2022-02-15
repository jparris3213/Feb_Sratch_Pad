const { Schema, model } = require("mongoose");

//Initially this was going to just be for Images, with a different Model for Video
//But they are similar enough to keep a single Model

const mediaSchema = new Schema({
    name: {
        type: String,
        required: true,
    },

    img_path: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: false,
    },
    media_type: {
        type: String,
        required: true,
    }, 

    customer: {
        type: String,
        required: false,
    },

    copyright_year: {
        type: String,
        required: false,
    }

});

const Media = model("Media",mediaSchema);

module.exports = Media;