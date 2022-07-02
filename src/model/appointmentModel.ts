import mongoose from "mongoose"

const appointmentSchema = new mongoose.Schema({
    appointmentId: {
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
    appointmentTime: {
        type: String,
        required: true
    },
    appointmentStatus: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    visitingReason: {
        type: String,
        required: true,
    },
    prescriptionId: {
        type: String,
    }
}
);

const Appointment = mongoose.model("Appointment", appointmentSchema);

export { Appointment };