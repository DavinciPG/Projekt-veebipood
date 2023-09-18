import mongoose from 'mongoose';

const kategooria = new mongoose.Schema({
    nimetus: {
        required: true,
        type: String,
    },
});

export default mongoose.model('Kategooria', kategooria);