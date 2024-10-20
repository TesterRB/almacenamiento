import {mongoose} from "mongoose"

//se debe especificar el nombre de la db dentro del cluster antes de "?"
const Uri = "mongodb+srv://marcoaragon:IEOgkNhCRtTlKb9b@marccluster.s41tx.mongodb.net/DATASTORAGE?retryWrites=true&w=majority"

const DATASTORAGE = async() => {
    await mongoose.connect(Uri)
    await mongoose.connection.db.admin().command({ping: 1})
}


export {DATASTORAGE}