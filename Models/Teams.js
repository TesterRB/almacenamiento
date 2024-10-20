import { Schema } from "mongoose";
import { model } from "mongoose";

const TeamsSchema = new Schema({
    "Name": {
        type: String,
        required: true,
        unique: true
    },

    "Nickname": String,

    "City": {
        type: String,
        required: true
    },

    "Country": {
        type: String,
        required: true
    },

    "Stadium": String,

    "President": String,

    "Head Coach": String,

    "Division": String,

    "Trophies": Array
},


{
    "collection": 'Teams'
})

TeamsSchema.methods.toJSON = function() {
    const {__v, ...data} = this.toObject()
    return data
}

export const TeamsModel = model("Teams", TeamsSchema)