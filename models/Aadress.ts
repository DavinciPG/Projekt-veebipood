import mongoose from 'mongoose';

const aadress = new mongoose.Schema({
    tänav: String,
    maja: String,
    linn: String,
    postiindeks: String,
});

export default mongoose.model('Aadress', aadress);