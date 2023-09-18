import mongoose from 'mongoose';

const arve = new mongoose.Schema({
    kuupäev: Date,
    arverida: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Arverida',
    }],
    kogusumma: Number,
    maksestaatus: String,
    klient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Klient',
    },
});

export default mongoose.model('Arve', arve);