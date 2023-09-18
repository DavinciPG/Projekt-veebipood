import mongoose from 'mongoose';

const maksestaatus = new mongoose.Schema({
    makseseisund: {
        required: true,
        type: Boolean,
    },
    maksmiseTähtaeg: Date,
    makstudSumma: Number,
    maksmiseKuupäev: Date,
});

export default mongoose.model('Maksestaatus', maksestaatus);