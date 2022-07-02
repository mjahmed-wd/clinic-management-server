import mongoose from "mongoose";

const drugSchema = new mongoose.Schema({
    drugName: {
        type: String,
        required: true,
    },
    drugStreangth: {
        type: String,
    },
    quantity: {
        type: String
    },
    description: {
        type: String
    }

})

const prescriptionSchema = new mongoose.Schema({
    prescriptionId: {
        type: String,
        required: true
    },
    patientId: {
        type: String,
        required: true
    },
    doctorId: {
        type: String,
        required: true
    },
    appointmentDate: {
        type: Date,
        required: true
    },
    drug: {
        type: [drugSchema]
    },
    notes: {
        type: String
    },
    description: {
        type: String
    }
});

const Appointment = mongoose.model("Appointment", prescriptionSchema);

export { Appointment };