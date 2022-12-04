import mongoose from 'mongoose';
const { Schema } = mongoose;

const roomSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    price:{
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    maxPeople: {
        type: Number,
        required: true
    },
    roomNumbers: [{number: Number, unavailableDates: {type: [Date]}}],
    //created/edited at
}, {timestamps: true})

export default mongoose.model("Room", roomSchema);