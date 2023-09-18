import mongoose from 'mongoose';

const arverida = new mongoose.Schema({
    toode: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Toode',
    },
    kogus: Number,
});

export default mongoose.model('Arverida', arverida);