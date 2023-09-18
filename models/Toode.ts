import mongoose from 'mongoose';

const toode = new mongoose.Schema({
    nimetus: {
        required: true,
        type: String,
    },
    kategooria: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Kategooria',
    },
    hind: Number,
    pildiUrl: String,
    aktiivne: Boolean,
    laokogus: Number,
    vananemisaeg: Date,
});

export default mongoose.model('Toode', toode);