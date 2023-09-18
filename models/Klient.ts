import mongoose from "mongoose";

const klient = new mongoose.Schema({
    nimi: {
        required: true,
        type: String
    },
    kontaktandmed: {
        required: true,
        type: mongoose.Schema.Types.ObjectId, ref: 'Kontaktandmed'
    },
    aadress: {
        required: true,
        type: mongoose.Schema.Types.ObjectId, ref: 'Aadress'
    },
})

export default mongoose.model('Klient', klient);