import mongoose from 'mongoose';

const kontaktandmed = new mongoose.Schema({
    telefoninumber: String,
    email: String,
});

export default mongoose.model('Kontaktandmed', kontaktandmed);