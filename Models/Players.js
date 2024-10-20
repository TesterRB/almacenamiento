import { Schema } from "mongoose";
import { model } from "mongoose";

const PlayersSchema = new Schema({
    "Name": {
        type: String,
        required: true
    },

    "Nickname": String,

    "Date of Birth": String,

    "Nationality": String,

    "Position": String,

    "Height": String,

    "Weight": String,

    "Current Team": {
        type: Schema.Types.ObjectId,
        ref: "Teams"
    },

    "Jersey Number": Number,

    "Dominant Foot": String,

    "Matches Played": Number,

    "Market Value": Number,

    "Team History": Array,

    "Agent": String
},

{
    "collection": "Players"
})

PlayersSchema.methods.toJSON = function() {
    const {__v, ...data} = this.toObject()
    return data
}

export const PlayersModel = model("Players", PlayersSchema)